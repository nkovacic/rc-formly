import { RcFormlyConfig } from '@rc-formly/core';

import {
    InputType
} from './types';

import {
    FormGroupWrapper
} from './wrappers';

export const registerRcFormlyBootstrapPackage = () => {
    RcFormlyConfig.addConfig({
        types: [
            {
                component: InputType,
                name: 'input'
            }
        ],
        wrappers: [
            {
                component: FormGroupWrapper,
                name: 'form-group'
            }
        ]
    });
}
