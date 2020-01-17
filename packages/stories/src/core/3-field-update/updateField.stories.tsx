import { storiesOf } from '@storybook/react';
import React, { useState, SFC } from 'react';
import { RcFormlyForm, IFormlyFieldConfig } from '@rc-formly/core';

// tslint:disable-next-line:variable-name
const UpdateFieldStory: SFC = () => {
    const initialValues = {};
    const [submittedModel, setSubmittedModel] = useState(null);

    const fields: IFormlyFieldConfig[] = [
        {
            key: 'firstName',
            type: 'basicInput',
            templateOptions: {
                label: 'Firstname',
                required: true,
                onChange: (newValue: string, oldValue: string, formlyProps) => {
                    formlyProps.changeFieldConfig('lastName', q => {
                        q.templateOptions.disabled = !newValue;

                        return q;
                    });
                }
            }
        },
        {
            key: 'lastName',
            type: 'basicInput',
            templateOptions: {
                label: 'Lastname',
                required: true,
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

storiesOf('@rc-formly/core/3. Field update', module).add('Field update disabled', () => {
    return (
        <UpdateFieldStory />
    );
});
