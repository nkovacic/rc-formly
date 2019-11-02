import React, { ChangeEvent } from 'react';
import { FormikFormlyField } from '@rc-formly/core';

export class InputFieldType extends FormikFormlyField {
    getFirstError() {
        const { errors, touched } = this.props.formikFormlyProps.formikProps;

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
        const inputType = this.getInputType();
        const error = this.getFirstError();

        return (
            <div>
                <label>
                    { label }
                </label>
                <input type={inputType} onBlur={this.handleBlur} onChange={this.onTextChange} placeholder={placeholder} />
                { error 
                    && <div style={ { color: 'red' } }>
                        { error }
                    </div> 
                }
            </div>
        );
    }
}