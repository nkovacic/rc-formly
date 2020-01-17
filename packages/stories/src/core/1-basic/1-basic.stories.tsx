import { storiesOf } from '@storybook/react';
import React, { useState, SFC } from 'react';
import { RcFormlyConfig, RcFormlyForm, IFormlyFieldConfig } from '@rc-formly/core';

import { InputFieldType } from '../InputFieldType';
import { FormElementWrapper } from '../FormElementWrapper';

RcFormlyConfig.addConfig({
    types: [
        {
            name: 'basicInput',
            component: InputFieldType
        }
    ],
    wrappers: [
        {
            name: 'formElementWrapper',
            component: FormElementWrapper
        }
    ],
    validatorMessages: [
        {
            name: 'required',
            message: (value, field) => {
                return `Field '${field.templateOptions.label}' is required!`;
            }
        },
        {
            name: 'minLength',
            message: (value, field) => {
                return `Field '${field.templateOptions.label}' needs to have atleast ${field.templateOptions.minLength} characters!`;
            }
        }
    ]
});

// tslint:disable-next-line:variable-name
const BasicStory: SFC = function () {
    const initialValues = {
        firstName: ''
    };
    const [submittedModel, setSubmittedModel] = useState(null);

    const fields: IFormlyFieldConfig[] = [
        {
            key: 'firstName',
            type: 'basicInput',
            templateOptions: {
                label: 'First name',
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

storiesOf('@rc-formly/core/1. Basic', module).add('Basic input', () => {
    return (
        <BasicStory />
    );
});
