import React, { Component } from 'react';

import { IFormlyFieldConfig } from './RcFormlyFieldConfig';
import { RcFormlyConfig } from './RcFormlyConfig';
import { IRcFormlyProps } from './RcFormlyProps';

import { UtilityHelper } from './utilities';

interface Props {
    fields: IFormlyFieldConfig[];
    formlyProps: IRcFormlyProps;
}

class RootFormikFormlyWrapper extends Component<Props> {
    renderFields(fields: IFormlyFieldConfig[]) {
        return fields.map((field, index) => {
            if (!UtilityHelper.isEmpty(field.wrappers)) {
                return this.renderWrappers(field, [...field.wrappers!], this.props.formlyProps, index);
            }

            return this.renderType(field, index);
        });
    }

    renderType(field: IFormlyFieldConfig, fieldIndex?: number) {
        const fieldType = RcFormlyConfig.getType(field.type!);

        if (fieldType && !field.hide) {
            // tslint:disable-next-line:variable-name
            const FieldComponent = fieldType.component;

            return (
                <FieldComponent key={fieldIndex} field={field} fieldType={fieldType}
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
            if (field.name) {
                return this.renderType(field, fieldIndex);
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

export default RootFormikFormlyWrapper;
