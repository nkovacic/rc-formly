import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { FormikFormlyForm, IFormlyFieldConfig } from '@formik-formly/core';

storiesOf('@formik-formly/core/1. Basic', module).add('first', () => {
    const fields: IFormlyFieldConfig[] = [
        {
            key: 'firstName',
            type: 'input',
            templateOptions: {
                label: 'First name',
                required: true
            }
        }
    ];

    return (
        <FormikFormlyForm fields={fields}></FormikFormlyForm>
    );
});
