import { useContext } from "react";

import { useFormlyConfigInterface } from "./types";
import { RcFormlyContext } from "src/RcFormlyProvider";

export const useFormlyConfig: useFormlyConfigInterface = () => {
    const { types, wrappers, validators, validatorMessages } = useContext(RcFormlyContext);

    const getType = (name: string) => {
        return types.find(q => q.name === name);
    };

    const getWrapper = (name: string) => {
        return wrappers.find(q => q.name === name);
    };

    const getValidator = (name: string) => {
        return validators.find(q => q.name === name);
    };

    const getValidatorMessage = (name: string) => {
        return validatorMessages.find(q => q.name === name);
    };

    return {
        getType,
        getValidator,
        getValidatorMessage,
        getWrapper
    };
}