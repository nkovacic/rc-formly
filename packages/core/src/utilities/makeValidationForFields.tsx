import * as Yup from 'yup';

import { IFormlyFieldConfig } from '../formikFormlyFieldConfig';
import { FormikFormlyConfig } from '../FormikFormlyConfig';

import { UtilityHelper } from './UtilityHelper';

const validationMessage = (validatorName: string, value: any, field: IFormlyFieldConfig) => {
    const validatorMessageOption = FormikFormlyConfig.getValidatorMessage(validatorName);

    if (validatorMessageOption) {
        return validatorMessageOption.message(value, field, {} as any);
    }

    return '';
};

const combineValidations = (validationSchema: Yup.Schema<any>, validationSchemas?: Yup.Schema<any>[]) => {
    if (UtilityHelper.isNotEmpty(validationSchemas)) {
        for (const schemaToMerge of validationSchemas!) {
            // tslint:disable-next-line:no-parameter-reassignment
            validationSchema = validationSchema.concat(schemaToMerge);
        }
    }

    return validationSchema;
};

const makeValidationForNumber = (value: number, field: IFormlyFieldConfig) => {
    let yupValidation =  Yup.number();

    if (field.templateOptions) {
        if (field.templateOptions.required) {
            yupValidation = yupValidation.required(validationMessage('required', value, field));
        }

        if (UtilityHelper.isNumber(field.templateOptions.min)) {
            yupValidation = yupValidation.min(field.templateOptions.min!, validationMessage('minx', value, field));
        }

        if (UtilityHelper.isNumber(field.templateOptions.max)) {
            yupValidation = yupValidation.max(field.templateOptions.max!, validationMessage('max', value, field));
        }
    }

    return yupValidation;
};

const makeValidationForMixed = (value: any, field: IFormlyFieldConfig) => {
    let yupValidation =  Yup.mixed();

    if (field.templateOptions && field.templateOptions.required) {
        yupValidation = yupValidation.required(validationMessage('required', value, field));
    }

    return yupValidation;
};

const makeValidationForString = (value: string, field: IFormlyFieldConfig) => {
    let yupValidation =  Yup.string();

    if (field.templateOptions) {
        if (field.templateOptions.required) {
            yupValidation = yupValidation.required(validationMessage('required', value, field));
        }

        if (UtilityHelper.isNumber(field.templateOptions.minLength)) {
            yupValidation = yupValidation.min(field.templateOptions.minLength!, validationMessage('minLength', value, field));
        }

        if (UtilityHelper.isNumber(field.templateOptions.maxLength)) {
            yupValidation = yupValidation.max(field.templateOptions.maxLength!, validationMessage('maxLength', value, field));
        }
    }

    return yupValidation;
};

const makeValidationForLazy = (value: any, field: IFormlyFieldConfig) => {
    if (UtilityHelper.isNumber(value)) {
        return makeValidationForNumber(value as number, field);
    }
    
    if (UtilityHelper.isString(value)) {
        return makeValidationForString(value, field);
    }

    return makeValidationForMixed(value, field);
};

export const makeValidationForFields = (fields: IFormlyFieldConfig[]) => {
    const validationObject = {} as { [key: string]: Yup.Schema<any> | Yup.Lazy };

    for (const field of fields) {
        const fieldType = FormikFormlyConfig.getType(field.type!);

        if (fieldType) {
            validationObject[field.key!] = Yup.lazy((value) => {
                const lazyValidation = makeValidationForLazy(value, field);

                return combineValidations(lazyValidation, fieldType.validators);
            });
        }
    }

    return Yup.object().shape(validationObject);
};
