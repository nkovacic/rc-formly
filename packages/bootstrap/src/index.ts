import { FormikFormlyConfig } from '@rc-formly/core';

import {
    FormGroupWrapper
} from './wrappers';

export const registerRcFormlyPackage = () => {
    FormikFormlyConfig.addConfig({
        types: [],
        wrappers: [
            {
                component: FormGroupWrapper,
                name: 'form-group'
            }
        ]
    });
}
