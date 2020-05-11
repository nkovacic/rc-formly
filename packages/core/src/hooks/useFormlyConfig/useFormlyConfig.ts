import { useContext } from 'react';

import { useFormlyConfigInterface } from './types';

import { RcFormlyContext } from '../../RcFormlyProvider';
import { RcFormlyConfig } from '../../RcFormlyConfig';

export const useFormlyConfig: useFormlyConfigInterface = () => {
    const { types, wrappers, validators, validatorMessages } = useContext(RcFormlyContext);

    const getType = (name: string) => {
        if (types.length) {
            return types.find(q => q.name === name);
        }

        return RcFormlyConfig.getType(name);
    };

    const getWrapper = (name: string) => {
        if (wrappers.length) {
            return wrappers.find(q => q.name === name);
        }

        return RcFormlyConfig.getWrapper(name);
    };

    const getValidator = (name: string) => {
        if (validators.length) {
            return validators.find(q => q.name === name);
        }

        return RcFormlyConfig.getValidator(name);
    };

    const getValidatorMessage = (name: string) => {
        if (validatorMessages.length) {
            return validatorMessages.find(q => q.name === name);
        }

        return RcFormlyConfig.getValidatorMessage(name);
    };

    return {
        getType,
        getValidator,
        getValidatorMessage,
        getWrapper
    };
};
