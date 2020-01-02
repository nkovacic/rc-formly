import { storiesOf } from '@storybook/react';
import React, { useState, SFC } from 'react';
import { RcFormlyForm, IFormlyFieldConfig } from '@rc-formly/core';
import { registerRcFormlyBootstrapPackage } from '@rc-formly/bootstrap';

const BasicStory: SFC = function () {
    const initialValues = {
        firstName: ''
    };
    const [submittedModel, setSubmittedModel] = useState(null);

    const fields: IFormlyFieldConfig[] = [
        {
            key: 'firstName',
            type: 'input',
            wrappers: ['form-group'],
            templateOptions: {
                label: 'Firstname',
                minLength: 5,
                required: true
            }
        }
    ];

    const onSubmit = (model: any) => {
        console.log(`Submitted ${JSON.stringify(model)}`);

        setSubmittedModel(model);
    };

    return (
        <div>
            <RcFormlyForm model={initialValues} fields={fields} onSubmit={onSubmit} render={(formlyProps, renderFields) => {
                return (
                    <form onSubmit={formlyProps.handleSubmit}>
                        { renderFields() }
                        <button type="submit" style={ { marginTop: '10px' }}>
                            Submit
                        </button>
                    </form>
                );
            }}>
            </RcFormlyForm>
        </div>
    );
};

storiesOf('@rc-formly/bootstrap/2. Form group', module).add('Form group with label', () => {
    return (
        <BasicStory />
    );
});