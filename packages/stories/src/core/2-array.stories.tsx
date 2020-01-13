import { storiesOf } from '@storybook/react';
import React, { useState, SFC } from 'react';
import { RcFormlyConfig, RcFormlyForm, IFormlyFieldConfig } from '@rc-formly/core';

import { RepeatValueArrayType } from './RepeatValueArrayType';

RcFormlyConfig.addConfig({
    types: [
        {
            name: 'basicRepeat',
            component: RepeatValueArrayType
        }
    ]
});

// tslint:disable-next-line:variable-name
const ArrayStory: SFC = () => {
    const initialValues = {
        values: []
    };
    const [submittedModel, setSubmittedModel] = useState(null);

    const fields: IFormlyFieldConfig[] = [
        {
            key: 'values',
            type: 'basicRepeat',
            templateOptions: {
                required: true,
                valueProp: 'newValue'
            },
            fieldArray: {
                fieldGroup: [
                    {
                        key: 'newValue',
                        type: 'basicInput',
                        templateOptions: {
                            label: 'New value',
                            minLength: 2,
                            required: true
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

storiesOf('@rc-formly/core/2. Arrays', module).add('Add values to array', () => {
    return (
        <ArrayStory />
    );
});
