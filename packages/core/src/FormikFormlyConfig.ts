import { ComponentType } from 'react';
import { Schema } from 'yup';

import { FormikFormlyFieldProps } from './FormikFormlyField';
import { IFormlyFieldConfig } from './formikFormlyFieldConfig';

import { UtilityHelper } from 'app/utilities';
import { KeyAlreadyExistsError } from 'app/utilities/errors';
import { FormikProps } from 'formik';

export interface IFormlyTypeDefinition<T extends FormikFormlyFieldProps = any> {
    name: string;
    component: ComponentType<T>;
    validators?: Schema<any>[];
    wrappers?: string[];
    defaultOptions?: IFormlyFieldConfig;
}

interface IWrapperOption {
    name: string;
    component: any;
    types?: string[];
}

interface IConfigOption {
    types?: IFormlyTypeDefinition[];
    validators?: IValidatorOption[];
    validatorMessages?: IValidatorMessageOption[];
    wrappers?: IWrapperOption[];
}

interface IValidatorOption {
    name: string;
    validator: (value: any, field: IFormlyFieldConfig) => Promise<boolean> | boolean;
}

interface IValidatorMessageOption {
    name: string;
    message: (value: any, field: IFormlyFieldConfig, formikProps: FormikProps<any>) => string;
}

export class FormikFormlyConfig {
    private static types: IFormlyTypeDefinition[] = [];
    private static validators: IValidatorOption[] = [];
    private static validatorMessages: IValidatorMessageOption[] = [];
    private static wrappers: IWrapperOption[] = [];

    public static addConfig(config: IConfigOption) {
        if (UtilityHelper.isEmpty(config)) {
            return;
        }

        if (UtilityHelper.isNotEmpty(config.types)) {
            for (const fieldType of config.types!) {
                if (!this.hasType(fieldType.name)) {
                    this.types.push(fieldType);
                }
                else {
                    throw new KeyAlreadyExistsError(fieldType.name, 'FormikFormlyConfig types');
                }
            }
        }

        if (UtilityHelper.isNotEmpty(config.wrappers)) {
            for (const fieldWrapper of config.wrappers!) {
                if (!this.hasWrapper(fieldWrapper.name)) {
                    this.wrappers.push(fieldWrapper);
                }
                else {
                    throw new KeyAlreadyExistsError(fieldWrapper.name, 'FormikFormlyConfig wrappers');
                }
            }
        }

        if (UtilityHelper.isNotEmpty(config.validators)) {
            for (const validator of config.validators!) {
                FormikFormlyConfig.addValidator(validator);
            }
        }

        if (UtilityHelper.isNotEmpty(config.validatorMessages)) {
            for (const validatorMessage of config.validatorMessages!) {
                FormikFormlyConfig.addValidatorMessage(validatorMessage);
            }
        }
    }

    public static addValidator(validatorOption: IValidatorOption) {
        if (UtilityHelper.isEmpty(validatorOption)) {
            return;
        }

        if (!this.hasValidator(validatorOption.name)) {
            this.validators.push(validatorOption);
        }
        else {
            throw new KeyAlreadyExistsError(validatorOption.name, 'FormikFormlyConfig validators');
        }
    }

    public static addValidatorMessage(validatorMessagesOption: IValidatorMessageOption) {
        if (UtilityHelper.isEmpty(validatorMessagesOption)) {
            return;
        }

        if (!this.hasValidatorMessage(validatorMessagesOption.name)) {
            this.validatorMessages.push(validatorMessagesOption);
        }
        else {
            throw new KeyAlreadyExistsError(validatorMessagesOption.name, 'FormikFormlyConfig validator message');
        }
    }

    public static getType(name: string) {
        return this.types.find(existingFieldType => existingFieldType.name === name) as IFormlyTypeDefinition<any> | undefined;
    }

    public static hasType(name: string) {
        return !UtilityHelper.isEmpty(this.getType(name));
    }

    public static getWrapper(name: string) {
        return this.wrappers.find(existingFieldType => existingFieldType.name === name);
    }

    public static hasWrapper(name: string) {
        return UtilityHelper.isNotEmpty(this.getWrapper(name));
    }

    public static getValidator(name: string) {
        return this.validators.find(existingValidator => existingValidator.name === name);
    }

    public static hasValidator(name: string) {
        return UtilityHelper.isNotEmpty(this.getValidator(name));
    }

    public static getValidatorMessage(name: string) {
        return this.validatorMessages.find(existingValidatorMessage => existingValidatorMessage.name === name);
    }

    public static hasValidatorMessage(name: string) {
        return UtilityHelper.isNotEmpty(this.getValidatorMessage(name));
    }
}
