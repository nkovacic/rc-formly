import { ComponentType } from 'react';
import { FormikProps } from 'formik';
import { Schema } from 'yup';

import { IFormlyFieldConfig, IFormlyTemplateOptions, IRcFormlyProps } from './field';
import { KeyValueObject } from './utilities';

export interface RcFormlyFieldProps<TFormlyTemplateOptions = IFormlyTemplateOptions> {
    field: IFormlyFieldConfig<TFormlyTemplateOptions>;
    fieldType: IFormlyTypeDefinition;
    formlyProps: IRcFormlyProps;
    model: KeyValueObject;
}

export interface IFormlyTypeDefinition<T extends RcFormlyFieldProps = any> {
    name: string;
    component: ComponentType<T>;
    validators?: Schema<any>[];
    wrappers?: string[];
    defaultOptions?: IFormlyFieldConfig;
}

export interface IWrapperOption {
    name: string;
    component: any;
    types?: string[];
}

export interface IValidatorOption {
    name: string;
    validator: (value: any, field: IFormlyFieldConfig) => Promise<boolean> | boolean;
}

export interface IValidatorMessageOption {
    name: string;
    message: (value: any, field: IFormlyFieldConfig, formikProps: FormikProps<any>) => string;
}

export interface RcFormlyContextState {
    types: IFormlyTypeDefinition[];
    validators: IValidatorOption[];
    validatorMessages: IValidatorMessageOption[];
    wrappers: IWrapperOption[];
    addType: (newType: IFormlyTypeDefinition) => void;
    addTypes: (newTypes: IFormlyTypeDefinition[]) => void;
    addWrapper: (newWrapper: IWrapperOption) => void;
    addWrappers: (newWrappers: IWrapperOption[]) => void;
    addValidator: (newValidator: IValidatorOption) => void;
    addValidators: (newValidators: IValidatorOption[]) => void;
    addValidatorMessage: (newValidatorMessage: IValidatorMessageOption) => void;
    addValidatorMessages: (newValidatorMessages: IValidatorMessageOption[]) => void;
}