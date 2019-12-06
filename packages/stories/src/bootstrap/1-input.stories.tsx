import { storiesOf } from '@storybook/react';
import React, { useState, SFC } from 'react';
import { RcFormlyForm, IFormlyFieldConfig } from '@rc-formly/core';
import { registerRcFormlyBootstrapPackage } from '@rc-formly/bootstrap';

registerRcFormlyBootstrapPackage();

const BasicStory: SFC = function () {
    const initialValues = {
        firstName: ''
    };
    const [submittedModel, setSubmittedModel] = useState(null);

    const fields: IFormlyFieldConfig[] = [
        {
            key: 'firstName',
            type: 'input',
            templateOptions: {
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

storiesOf('@rc-formly/bootstrap/1. Input', module).add('firstInput', () => {
    return (
        <BasicStory />
    );
});