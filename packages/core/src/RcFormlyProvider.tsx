import React, { createContext, FC, useState, useEffect } from 'react';
import { RcFormlyContextState, IFormlyTypeDefinition, IValidatorOption, IValidatorMessageOption, IWrapperOption } from './types';
import { UtilityHelper } from './utilities';
import { Logger } from './services';
import { RcFormlyConfig } from './RcFormlyConfig';

const warnMessage = (componentName: string) => `Adding ${componentName} without using RcFormlProvider is deprecated!`;

export const RcFormlyContext = createContext<RcFormlyContextState>({
    types: [],
    validatorMessages: [],
    validators: [],
    wrappers: [],
    addWrapper: (wrapper: IWrapperOption) => {
        Logger.warn(warnMessage('wrapper'));

        RcFormlyConfig.addConfig({
            wrappers: [wrapper]
        });
    },
    addWrappers: (wrappers: IWrapperOption[]) => {
        Logger.warn(warnMessage('wrappers'));

        RcFormlyConfig.addConfig({
            wrappers
        });
    },
    addType: (type: IFormlyTypeDefinition) => {
        Logger.warn(warnMessage('type'));

        RcFormlyConfig.addConfig({
            types: [type]
        });
    },
    addTypes: (types: IFormlyTypeDefinition[]) => {
        Logger.warn(warnMessage('types'));

        RcFormlyConfig.addConfig({
            types
        });
    },
    addValidator: (validator: IValidatorOption) => {
        Logger.warn(warnMessage('validator'));

        RcFormlyConfig.addConfig({
            validators: [validator]
        });
    },
    addValidators: (validators: IValidatorOption[]) => {
        Logger.warn(warnMessage('validators'));

        RcFormlyConfig.addConfig({
            validators
        });
    },
    addValidatorMessage: (validatorMessage: IValidatorMessageOption) => {
        Logger.warn(warnMessage('validatorMessage'));

        RcFormlyConfig.addConfig({
            validatorMessages: [validatorMessage]
        });
    },
    addValidatorMessages: (validatorMessages: IValidatorMessageOption[]) => {
        Logger.warn(warnMessage('validatorMessages'));

        RcFormlyConfig.addConfig({
            validatorMessages
        });
    }
});

interface RcFormlyProviderProps {
    types?: IFormlyTypeDefinition[];
    validators?: IValidatorOption[];
    validatorMessages?: IValidatorMessageOption[];
    wrappers?: IWrapperOption[];
}

export const RcFormlyProvider: FC<RcFormlyProviderProps> = props => {
    const { children, ...otherProps } = props;
    const [types, setTypes] = useState<IFormlyTypeDefinition[]>([]);
    const [validators, setValidators] = useState<IValidatorOption[]>([]);
    const [validatorMessages, setValidatorMessages] = useState<IValidatorMessageOption[]>([]);
    const [wrappers, setWrappers] = useState<IWrapperOption[]>([]);

    const hasType = (name: string) => {
        return types.some(q => q.name === name);
    };

    const hasWrapper = (name: string) => {
        return wrappers.some(q => q.name === name);
    };

    const hasValidator = (name: string) => {
        return validators.some(q => q.name === name);
    };

    const hasValidatorMessage = (name: string) => {
        return validatorMessages.some(q => q.name === name);
    };

    const addTypes = (newTypes: IFormlyTypeDefinition[]) => {
        if (UtilityHelper.isEmpty(newTypes)) {
            return;
        }

        const uniqueTypes = newTypes.filter(q => !hasType(q.name));

        if (uniqueTypes.length) {
            setTypes([...types, ...uniqueTypes]);
        }
    };

    const addType = (type: IFormlyTypeDefinition) => {
        addTypes([type]);
    };

    const addWrappers = (newWrappers: IWrapperOption[]) => {
        if (UtilityHelper.isEmpty(newWrappers)) {
            return;
        }

        const uniqueWrappers = newWrappers.filter(q => !hasWrapper(q.name));

        if (uniqueWrappers.length) {
            setWrappers([...wrappers, ...uniqueWrappers]);
        }
    };

    const addWrapper = (newWrapper: IWrapperOption) => {
        addWrappers([newWrapper]);
    };

    const addValidators = (validatorOptions: IValidatorOption[]) => {
        if (UtilityHelper.isEmpty(validatorOptions)) {
            return;
        }

        const uniqueValidators = validatorOptions.filter(q => !hasValidator(q.name));

        if (uniqueValidators.length) {
            setValidators([...validators, ...uniqueValidators]);
        }
    };

    const addValidator = (validatorOption: IValidatorOption) => {
        addValidators([validatorOption]);
    };

    const addValidatorMessages = (neValidatorMessagesOptions: IValidatorMessageOption[]) => {
        if (UtilityHelper.isEmpty(neValidatorMessagesOptions)) {
            return;
        }

        const uniqueValidatorMessageOptions = neValidatorMessagesOptions.filter(q => !hasValidatorMessage(q.name));

        if (uniqueValidatorMessageOptions.length) {
            setValidatorMessages([...validatorMessages, ...uniqueValidatorMessageOptions]);
        }
    };

    const addValidatorMessage = (validatorMessage: IValidatorMessageOption) => {
        addValidatorMessages([validatorMessage]);
    };

    useEffect(() => {
        if (otherProps.types) {
            addTypes(otherProps.types);
        }

        if (otherProps.wrappers) {
            addWrappers(otherProps.wrappers);
        }

        if (otherProps.validators) {
            addValidators(otherProps.validators);
        }

        if (otherProps.validatorMessages) {
            addValidatorMessages(otherProps.validatorMessages);
        }
    }, []);

    const contextValue: RcFormlyContextState = {
        types,
        validatorMessages,
        validators,
        wrappers,
        addType,
        addTypes,
        addValidator,
        addValidatorMessage,
        addValidatorMessages,
        addValidators,
        addWrapper,
        addWrappers
    };

    return <RcFormlyContext.Provider value={contextValue}>{children}</RcFormlyContext.Provider>;
};
