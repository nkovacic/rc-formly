import React from 'react';
import { RcFormlyWrapper } from '@rc-formly/core';

export class FormElementWrapper extends RcFormlyWrapper {
    render() {
        const error = this.getFieldError();
        const touched = this.wasFieldTouched();
        const submitted = this.wasFormSubmitted();
        const showError = error && (touched || submitted);
        const formGroupClassNames = `form-element ${ showError ? 'has-error' : '' }`;

        return (
            <div className={formGroupClassNames}>
                { this.props.children }
                {
                    showError && <div style={ { color: 'red' } }>
                        { error }
                    </div>
                }
            </div>
        )
    }
}
