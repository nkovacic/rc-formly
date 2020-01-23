import React, { useState, SFC } from 'react';
import { RcFormlyConfig, RcFormlyForm, IFormlyFieldConfig } from '@rc-formly/core';
import { storiesOf } from '@storybook/react';

import { RepeatEditArrayType } from '../RepeatEditArrayType';

RcFormlyConfig.addConfig({
    types: [
        {
            name: 'editRepeat',
            component: RepeatEditArrayType
        }
    ]
});

// tslint:disable-next-line:variable-name
const InputArrayStory: SFC = () => {
    const initialValues = {
        values: []
    };
    const [submittedModel, setSubmittedModel] = useState(null);

    const fields: IFormlyFieldConfig[] = [
        {
            key: 'values',
            type: 'editRepeat',
            templateOptions: {
                required: true
            },
            fieldArray: {
                fieldGroup: [
                    {
                        key: 'newValue.title',
                        type: 'basicInput',
                        templateOptions: {
                            placeholder: 'New value',
                            minLength: 2
                        }
                    }
                ]
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

storiesOf('@rc-formly/core/2. Arrays', module).add('Add nested editable value to array', () => {
    return (
        <InputArrayStory />
    );
});
