import { storiesOf } from '@storybook/react';
import React, { useState, SFC } from 'react';
import { RcFormlyForm, IFormlyFieldConfig } from '@rc-formly/core';

// tslint:disable-next-line:variable-name
const FieldValidationNestedStory: SFC = () => {
    const initialValues = {};
    const [submittedModel, setSubmittedModel] = useState(null);

    const fields: IFormlyFieldConfig[] = [
        {
            key: 'fullName',
            type: 'basicInput',
            templateOptions: {
                label: 'Full Name',
                required: true
            }
        },
        {
            fieldGroup: [
                {
                    key: 'address.street',
                    type: 'basicInput',
                    templateOptions: {
                        label: 'Address street',
                        required: true
                    }
                },
                {
                    key: 'address.country',
                    type: 'basicInput',
                    templateOptions: {
                        label: 'Address country',
                        required: true
                    }
                }
            ]
        }
    ];

    const onSubmit = (model: any) => {
        console.log(`Submitted ${JSON.stringify(model)}`);

        setSubmittedModel(model);
    };

    return (
        <div>
            <RcFormlyForm model={initialValues} fields={fields} onSubmit={onSubmit} render={(formikProps, renderFields) => {
                return (
                    <form onSubmit={formikProps.handleSubmit}>
                        { renderFields() }
                        <button type="submit" style={ { marginTop: '10px' }}>
                            Submit
                        </button>
                    </form>
                );
            }}>
            </RcFormlyForm>
            <div>
                Submitted value: { JSON.stringify(submittedModel)}
            </div>
        </div>
    );
};

storiesOf('@rc-formly/core/4. Field validation', module).add('Field validation nested', () => {
    return (
        <FieldValidationNestedStory />
    );
});
