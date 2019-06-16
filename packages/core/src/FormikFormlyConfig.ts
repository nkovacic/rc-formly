import { ComponentType } from 'react';
import { Schema } from 'yup';

import { FormikFormlyFieldProps } from './FormikFormlyField';
import { IFormlyFieldConfig } from './formikFormlyFieldConfig';

import { UtilityHelper } from 'app/utilities';
import { KeyAlreadyExistsError } from 'app/utilities/errors';

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
    wrappers?: IWrapperOption[];
}

export class FormikFormlyConfig {
    private static types: IFormlyTypeDefinition[] = [];
    private static wrappers: IWrapperOption[] = [];

    public static addConfig(config: IConfigOption) {
        if (UtilityHelper.isEmpty(config)) {
            return;
        }

        if (!UtilityHelper.isEmpty(config.types)) {
            for (const fieldType of config.types!) {
                if (!this.hasType(fieldType.name)) {
                    this.types.push(fieldType);
                }
                else {
                    throw new KeyAlreadyExistsError(fieldType.name, 'FormikFormlyConfig types');
                }
            }
        }

        if (!UtilityHelper.isEmpty(config.wrappers)) {
            for (const fieldWrapper of config.wrappers!) {
                if (!this.hasWrapper(fieldWrapper.name)) {
                    this.wrappers.push(fieldWrapper);
                }
                else {
                    throw new KeyAlreadyExistsError(fieldWrapper.name, 'FormikFormlyConfig wrappers');
                }
            }
        }
    }

    public static getType(name: string) {
        return this.types.find(existingFieldType => existingFieldType.name === name);
    }

    public static hasType(name: string) {
        return !UtilityHelper.isEmpty(this.getType(name));
    }

    public static getWrapper(name: string) {
        return this.wrappers.find(existingFieldType => existingFieldType.name === name);
    }

    public static hasWrapper(name: string) {
        return !UtilityHelper.isEmpty(this.getWrapper(name));
    }
}
