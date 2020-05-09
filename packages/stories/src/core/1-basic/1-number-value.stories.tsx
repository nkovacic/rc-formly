import { storiesOf } from '@storybook/react';
import React, { useState, FC } from 'react';
import {
    IFormlyFieldConfig, IFormlyTypeDefinition, IWrapperOption,
    RcFormlyForm,  RcFormlyProvider, IValidatorMessageOption
} from '@rc-formly/core';

import { InputFieldType } from '../InputFieldType';
import { FormElementWrapper } from '../FormElementWrapper';

// tslint:disable-next-line:variable-name
const BasicStory: FC = () => {
    const [submittedModel, setSubmittedModel] = useState(null);

    const fields: IFormlyFieldConfig[] = [
        {
            key: 'number',
            type: 'basicInput',
            templateOptions: {
                label: 'Number',
                type: 'number',
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
            <RcFormlyForm fields={fields} onSubmit={onSubmit} render={(formikProps, renderFields) => {
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

storiesOf('@rc-formly/core/1. Basic', module).add('Number input', () => {
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
