import React from 'react';
import { RcFormlyWrapper } from '@rc-formly/core';

export class FormGroupWrapper extends RcFormlyWrapper {
    getFormGroupClassNames() {
        return `form-group ${this.hasErrors() ? 'has-error' : '' }`; 
    }

    render() {
        const error = this.getFieldError();
        const touched = this.getFieldTouched()
        const formGroupClassNames = `form-group ${error && touched ? 'has-error' : '' }`;

        return (
            <div className={formGroupClassNames}>
                {
                    this.to!.label && <label>
                        { this.to!.label}
                    </label>
                } 
                { this.props.children }
                {
                    error && <div className="invalid-feedback">
                        { error }
                    </div>
                }
            </div>
        )
    }
}