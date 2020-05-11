import React from 'react';
import { RcFormlyField } from '@rc-formly/core';

export class InputType extends RcFormlyField {
    get type() {
        if (this.to && this.to.type) {
            return this.to.type;
        }

        return 'text';
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.handleChange(event.target.value);
    };

    render() {
        const inputClassNames = `form-control ${this.hasErrors() && this.wasFieldTouched() ? 'has-error' : ''}`;
        const placholder = this.to && this.to.placeholder ? this.to.placeholder : '';

        return (
            <input
                className={inputClassNames}
                name={this.getFieldKey()}
                type={this.type}
                onBlur={this.handleBlur}
                onChange={this.onChange}
                placeholder={placholder}
                value={this.getFieldValue() || ''}
            />
        );
    }
}
