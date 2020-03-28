import { storiesOf } from '@storybook/react';
import React, { useState, SFC } from 'react';
import {
    IFormlyFieldConfig, IFormlyTypeDefinition, IWrapperOption,
    RcFormlyForm,  RcFormlyProvider, IValidatorMessageOption
} from '@rc-formly/core';

import { InputFieldType } from '../InputFieldType';
import { FormElementWrapper } from '../FormElementWrapper';

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
    const types: IFormlyTypeDefinition[] = [
        {
            name: 'basicInput',
            component: InputFieldType
        }
    ];

    const wrappers: IWrapperOption[] = [
        {
            name: 'formElementWrapper',
            component: FormElementWrapper
        }
    ];

    const validatorMessages: IValidatorMessageOption[] = [
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
    ];

    return (
        <RcFormlyProvider types={types} wrappers={wrappers} validatorMessages={validatorMessages}>
            <BasicStory />
        </RcFormlyProvider>
    );
});
