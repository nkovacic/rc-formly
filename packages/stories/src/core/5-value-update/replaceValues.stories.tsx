import { storiesOf } from '@storybook/react';
import React, { useState, SFC } from 'react';
import { RcFormlyForm, IFormlyFieldConfig, IRcFormlyProps } from '@rc-formly/core';

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

    const replaceInitialValues = (formlyProps: IRcFormlyProps) => {
        formlyProps.replaceValues({
            firstName: 'Test',
            lastName: 'Second'
        });
    }

    return (
        <div>
            <RcFormlyForm model={initialValues} fields={fields} onSubmit={onSubmit} render={(formlyProps, renderFields) => {
                return (
                    <form onSubmit={formlyProps.handleSubmit}>
                        { renderFields() }
                        <button onClick={() => replaceInitialValues(formlyProps)} type="button">
                            Replace values
                        </button>
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

storiesOf('@rc-formly/core/5. Value update', module).add('Replace values', () => {
    return (
        <UpdateFieldStory />
    );
});
