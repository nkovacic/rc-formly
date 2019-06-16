import * as Yup from 'yup';

import { IFormlyFieldConfig } from "../formikFormlyFieldConfig";
import { FormikFormlyConfig } from '../FormikFormlyConfig';

import { UtilityHelper } from 'app/services';

import { formTranslations } from 'app/components/forms';

const requiredMessage = (field: IFormlyFieldConfig) => {
    return validationMessage(field, formTranslations.validation.requiredLabel, formTranslations.validation.required);
};

const validationMessage = (field: IFormlyFieldConfig, validationMessageLabel: string, validationMessage: string, ...additionalParameters: any[]) => {
    if (field.templateOptions && !UtilityHelper.isEmpty(field.templateOptions.label)) {
        return formTranslations.formatString(validationMessageLabel, field.templateOptions.label!, ...additionalParameters) as string;
    }

    return formTranslations.formatString(validationMessage, ...additionalParameters) as string;
}

const combineValidations = (validationSchema: Yup.Schema<any>, validationSchemas?: Yup.Schema<any>[]) => {
    if (!UtilityHelper.isEmpty(validationSchemas)) {
        for (let schemaToMerge of validationSchemas!) {
            validationSchema = validationSchema.concat(schemaToMerge);
        }
    }

    return validationSchema;
};

const makeValidationForNumber = (value: number, field: IFormlyFieldConfig) => {
    let yupValidation =  Yup.number();

    if (field.templateOptions) {
        if (field.templateOptions.required) {
            yupValidation = yupValidation.required(requiredMessage(field));
        }

        if (UtilityHelper.isNumber(field.templateOptions.min)) {
            yupValidation = yupValidation.min(field.templateOptions.min!, validationMessage(field,
                formTranslations.validation.min, formTranslations.validation.minLabel,
                value, field.templateOptions.label))
        }

        if (UtilityHelper.isNumber(field.templateOptions.max)) {
            yupValidation = yupValidation.max(field.templateOptions.max!, validationMessage(field,
                formTranslations.validation.max, formTranslations.validation.maxLabel,
                value, field.templateOptions.label))
        }
    }

    return yupValidation;
};

const makeValidationForMixed = (field: IFormlyFieldConfig) => {
    let yupValidation =  Yup.mixed();

    if (field.templateOptions && field.templateOptions.required) {
        yupValidation = yupValidation.required(requiredMessage(field));
    }

    return yupValidation;
};

const makeValidationForString = (value: string, field: IFormlyFieldConfig) => {
    let yupValidation =  Yup.string();

    if (field.templateOptions) {
        if (field.templateOptions.required) {
            yupValidation = yupValidation.required(requiredMessage(field));
        }

        if (UtilityHelper.isNumber(field.templateOptions.minLength)) {
            yupValidation = yupValidation.min(field.templateOptions.minLength!, validationMessage(field,
                formTranslations.validation.minLength, formTranslations.validation.minLengthLabel,
                value, field.templateOptions.label))
        }

        if (UtilityHelper.isNumber(field.templateOptions.maxLength)) {
            yupValidation = yupValidation.max(field.templateOptions.maxLength!, validationMessage(field,
                formTranslations.validation.maxLength, formTranslations.validation.maxLengthLabel,
                value, field.templateOptions.label))
        }
    }

    return yupValidation;
};

const makeValidationForLazy = (value: any, field: IFormlyFieldConfig) => {
    if (UtilityHelper.isNumber(value)) {
        return makeValidationForNumber(value as number, field);
    }
    else if (UtilityHelper.isString(value)) {
        return makeValidationForString(value, field);
    }
    else {
        return makeValidationForMixed(field);
    }
};

export const makeValidationForFields = (fields: IFormlyFieldConfig[]) => {
    let validationObject = {} as { [key: string]: Yup.Schema<any> | Yup.Lazy };

    for (let field of fields) {
        const fieldType = FormikFormlyConfig.getType(field.type!);

        if (fieldType) {
            validationObject[field.key!] = Yup.lazy(value => {
                let lazyValidation = makeValidationForLazy(value, field);

                return combineValidations(lazyValidation, fieldType.validators);
            });
        }
    }

    return Yup.object().shape(validationObject);
};
