import { IFormlyTypeDefinition, IValidatorOption, IWrapperOption, IValidatorMessageOption } from "../../types";

export interface useFormlyConfigInterface {
    (): {
        getType: (name: string) => IFormlyTypeDefinition<any> | undefined;
        getValidator: (name: string) => IValidatorOption | undefined;
        getValidatorMessage: (name: string) => IValidatorMessageOption | undefined;
        getWrapper: (name: string) => IWrapperOption | undefined;
    }
}