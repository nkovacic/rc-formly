import React, { Component } from 'react';
import { FieldArray } from 'formik';

import { IFormlyFieldConfig, IRcFormlyProps } from './RcFormlyFieldConfig';
import { RcFormlyConfig } from './RcFormlyConfig';

import { UtilityHelper } from './utilities';

interface Props {
    fields: IFormlyFieldConfig[];
    formlyProps: IRcFormlyProps;
}

class RcFormlyFieldRenderer extends Component<Props> {
    renderFields(fields: IFormlyFieldConfig[]): any  {
        return fields.map((field, index) => {
            if (UtilityHelper.isNotEmpty(field.wrappers)) {
                return this.renderWrappers(field, [...field.wrappers!], this.props.formlyProps, index);
            }

            if (!field.type && UtilityHelper.isNotEmpty(field.fieldGroup)) {
                return this.renderFields(field.fieldGroup!);
            }

            return this.renderType(field);
        });
    }

    renderType(field: IFormlyFieldConfig)  {
        const fieldType = RcFormlyConfig.getType(field.type!);

        if (fieldType && !field.hide) {
            // tslint:disable-next-line:variable-name
            const FieldComponent = fieldType.component;

            if (field.fieldArray) {
                return (
                    <FieldArray
                        key={field.id}
                        name={field.key!}
                        render={({ form, name, ...otherProps }) => (
                            <FieldComponent field={field} fieldType={fieldType}
                                formlyArrayHelpers={otherProps}
                                formlyProps={this.props.formlyProps} styles={field.style}
                            />
                        )}
                    />
                )
            }

            return (
                <FieldComponent key={field.id} field={field} fieldType={fieldType}
                    formlyProps={this.props.formlyProps} styles={field.style}
                />
            );
        }

        return null;
    }

    renderWrappers(
        field: IFormlyFieldConfig, wrappers: string[],
        formlyProps: IRcFormlyProps, fieldIndex?: number): JSX.Element[] | JSX.Element | null {
        if (UtilityHelper.isEmpty(wrappers)) {
            if (field.type) {
                return this.renderType(field);
            }

            if (!UtilityHelper.isEmpty(field.fieldGroup)) {
                return this.renderFields(field.fieldGroup!) as JSX.Element[];
            }

            return null;
        }

        const wrapper = wrappers.pop();
        const fieldWrapper = RcFormlyConfig.getWrapper(wrapper!);

        if (fieldWrapper) {
            // tslint:disable-next-line:variable-name
            const WrapperComponent = fieldWrapper.component;

            return (
                <WrapperComponent key={fieldIndex} parentField={field} formlyProps={formlyProps} >
                    {this.renderWrappers(field, wrappers, formlyProps, fieldIndex)}
                </WrapperComponent>
            );
        }

        return this.renderWrappers(field, wrappers, formlyProps);
    }

    render() {
        return this.renderFields(this.props.fields);
    }
}

export default RcFormlyFieldRenderer;
