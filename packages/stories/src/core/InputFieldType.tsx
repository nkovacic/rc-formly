import React, { ChangeEvent } from 'react';
import { RcFormlyField } from '@rc-formly/core';

export class InputFieldType extends RcFormlyField {
    getFirstError() {
        const { submitCount } = this.props.formlyProps.formProps;
        const error = this.getFieldError();

        if (error && (this.wasFieldTouched() || submitCount > 0)) {
            return error;
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
        if (this.getInputType() === 'number') {
            this.handleChange(parseFloat(evt.target.value));

            return;
        }

        this.handleChange(evt.target.value);
    }

    render() {
        const { disabled, label, placeholder } = this.props.field.templateOptions || { };
        const value = this.getFieldValue() || '';
        const inputType = this.getInputType();

        return (
            <div>
                <label>
                    { label }
                </label>
                <input name={this.getFieldKey()}
                    type={inputType} onBlur={this.handleBlur} onChange={this.onTextChange}
                    placeholder={placeholder} disabled={disabled} value={`${value}`} />
            </div>
        );
    }
}
