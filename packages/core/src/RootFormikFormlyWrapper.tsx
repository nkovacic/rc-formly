import React, { Component } from 'react';

import { IFormlyFieldConfig } from './formikFormlyFieldConfig';
import { FormikFormlyConfig } from './FormikFormlyConfig';
import { IFormikFormlyProps } from './FormikFormlyProps';

import { UtilityHelper } from './utilities';

interface Props {
    fields: IFormlyFieldConfig[];
    formikFormlyProps: IFormikFormlyProps;
}

class RootFormikFormlyWrapper extends Component<Props> {
    renderFields(fields: IFormlyFieldConfig[]) {
        return fields.map((field, index) => {
            if (!UtilityHelper.isEmpty(field.wrappers)) {
                return this.renderWrappers(field, [...field.wrappers!], this.props.formikFormlyProps, index);
            }

            return this.renderType(field, index);
        });
    }

    renderType(field: IFormlyFieldConfig, fieldIndex?: number) {
        const fieldType = FormikFormlyConfig.getType(field.type!);

        if (fieldType && !field.hide) {
            // tslint:disable-next-line:variable-name
            const FieldComponent = fieldType.component;

            return (
                <FieldComponent key={fieldIndex} field={field} fieldType={fieldType}
                    formikFormlyProps={this.props.formikFormlyProps} styles={field.style}
                />
            );
        }

        return null;
    }

    renderWrappers(
        field: IFormlyFieldConfig, wrappers: string[], 
        formikFormlyProps: IFormikFormlyProps, fieldIndex?: number): JSX.Element[] | JSX.Element | null {
        if (UtilityHelper.isEmpty(wrappers)) {
            if (field.name) {
                return this.renderType(field, fieldIndex);
            }
            
            if (!UtilityHelper.isEmpty(field.fieldGroup)) {
                return this.renderFields(field.fieldGroup!) as JSX.Element[];
            }

            return null;
        }

        const wrapper = wrappers.pop();
        const fieldWrapper = FormikFormlyConfig.getWrapper(wrapper!);

        if (fieldWrapper) {
            // tslint:disable-next-line:variable-name
            const WrapperComponent = fieldWrapper.component;

            return (
                <WrapperComponent key={fieldIndex} parentField={field} formikFormlyProps={formikFormlyProps} >
                    {this.renderWrappers(field, wrappers, formikFormlyProps, fieldIndex)}
                </WrapperComponent>
            );
        }

        return this.renderWrappers(field, wrappers, formikFormlyProps);
    }

    render() {
        return this.renderFields(this.props.fields);
    }
}

export default RootFormikFormlyWrapper;
