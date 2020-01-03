import React from 'react';
import { RcFormlyWrapper } from '@rc-formly/core';

export class FormGroupWrapper extends RcFormlyWrapper {
    getFormGroupClassNames() {
        return `form-group ${this.hasErrors() ? 'has-error' : '' }`;
    }

    render() {
        const error = this.getFieldError();
        const touched = this.getFieldTouched()
        const showError = error && touched;
        const formGroupClassNames = `form-group ${ showError ? 'has-error' : '' }`;

        return (
            <div className={formGroupClassNames}>
                {
                    this.to!.label && <label>
                        { this.to!.label}
                    </label>
                }
                { this.props.children }
                {
                    showError && <div className="invalid-feedback">
                        { error }
                    </div>
                }
            </div>
        )
    }
}
