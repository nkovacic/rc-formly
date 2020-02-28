import React, { createContext, FC, useState, useEffect } from 'react';
import { RcFormlyContextState, IFormlyTypeDefinition, IValidatorOption, IValidatorMessageOption, IWrapperOption } from './types';
import { UtilityHelper } from './utilities';

export const RcFormlyContext = createContext<RcFormlyContextState>({
    types: [],
    validatorMessages: [],
    validators: [],
    wrappers: [],
    addWrappers: () => {},
    addType: () => {},
    addTypes: () => {},
    addValidator: () => {},
    addValidatorMessage: () => {},
    addValidatorMessages: () => {},
    addValidators: () => {},
    addWrapper: () => {}
});

interface RcFormlyProviderProps extends RcFormlyContextState {
    types: IFormlyTypeDefinition[];
    validators: IValidatorOption[];
    validatorMessages: IValidatorMessageOption[];
    wrappers: IWrapperOption[];
}

export const RcFormlyProvider: FC<RcFormlyProviderProps> = props => {
    const { children, ...otherProps } = props;
    const [types, setTypes] = useState<IFormlyTypeDefinition[]>([]);
    const [validators, setValidators] = useState<IValidatorOption[]>([]);
    const [validatorMessages, setValidatorMessages] = useState<IValidatorMessageOption[]>([]);
    const [wrappers, setWrappers] = useState<IWrapperOption[]>([]);

    const addType = (type: IFormlyTypeDefinition) => {
        addTypes([type]);
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

    const addWrapper = (newWrapper: IWrapperOption) => {
        addWrappers([newWrapper]);
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

    const addValidator = (validatorOption: IValidatorOption) => {
        addValidators([validatorOption]);
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

    const addValidatorMessage = (validatorMessage: IValidatorMessageOption) => {
        addValidatorMessages([validatorMessage]);
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

    useEffect(() => {
        addTypes(otherProps.types);
        addWrappers(otherProps.wrappers);
        addValidators(otherProps.validators);
        addValidatorMessages(otherProps.validatorMessages);
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
