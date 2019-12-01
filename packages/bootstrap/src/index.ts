import { RcFormlyConfig } from '@rc-formly/core';

import {
    FormGroupWrapper
} from './wrappers';

export const registerRcFormlyPackage = () => {
    RcFormlyConfig.addConfig({
        types: [],
        wrappers: [
            {
                component: FormGroupWrapper,
                name: 'form-group'
            }
        ]
    });
}
