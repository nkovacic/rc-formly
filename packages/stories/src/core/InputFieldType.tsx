import React, { ChangeEvent } from 'react';
import { RcFormlyField } from '@rc-formly/core';

export class InputFieldType extends RcFormlyField {
    getFirstError() {
        const { errors } = this.props.formlyProps.formProps;

        if (this.wasFieldTouched() && errors[this.props.field.key]) {
            return errors[this.props.field.key] as string;
        }

        return null;
    }

    getInputType() {
        if (this.props.field.templateOptions && this.props.field.templateOptions.type) {
            return this.props.field.templateOptions.type;
        }

        return 'text';
    }

    onTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
        this.handleChange(evt.target.value);
    }

    render() {
        const templateOptions = this.props.field.templateOptions || { };
        const { label, placeholder } = templateOptions;
        const value = this.getFieldValue() || '';
        const inputType = this.getInputType();
        const error = this.getFirstError();

        return (
            <div>
                <label>
                    { label }
                </label>
                <input type={inputType} onBlur={this.handleBlur} onChange={this.onTextChange} placeholder={placeholder} value={value} />
                { error
                    && <div style={ { color: 'red' } }>
                        { error }
                    </div>
                }
            </div>
        );
    }
}
