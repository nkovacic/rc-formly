import { FormikProps } from 'formik';
import * as Yup from 'yup';

import { IFormlyFieldConfig } from '../types';
import { RcFormlyConfig } from '../RcFormlyConfig';
import { KeyValueObject } from '../types';

import { UtilityHelper } from './UtilityHelper';

export interface IFormikFormlyYupContext {
    formlyProps: FormikProps<any>;
}

const validationMessage = (validatorName: string, value: any, field: IFormlyFieldConfig, formikProps: FormikProps<any>) => {
    const validatorMessageOption = RcFormlyConfig.getValidatorMessage(validatorName);

    if (validatorMessageOption) {
        return validatorMessageOption.message(value, field, formikProps);
    }

    return '';
};

const combineValidations = (validationSchemas?: Yup.Schema<any>[]) => {
    if (UtilityHelper.isNotEmpty(validationSchemas)) {
        let validationSchema = validationSchemas![0];

        validationSchemas!.slice(1).forEach((schemaToMerge) => {
            validationSchema = validationSchema.concat(schemaToMerge);
        });

        return validationSchema;
    }

    return null;
};
/*
const makeValidationForNumber = (value: any, field: IFormlyFieldConfig) => {
    let yupValidation =  Yup.number();

    if (field.templateOptions) {
        if (field.templateOptions.required) {
            yupValidation = yupValidation
                .when('required', {
                    is: true,
                    then: Yup.number()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.NumberSchema) => {
                    return schema.required(validationMessage('required', value, field, formikProps));
                });
        }

        if (UtilityHelper.isNumber(field.templateOptions.min)) {
            yupValidation = yupValidation
                .when('min', {
                    is: true,
                    then: Yup.number()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.NumberSchema) => {
                    return schema.min(field.templateOptions!.min!, validationMessage('min', value, field, formikProps));
                });
        }

        if (UtilityHelper.isNumber(field.templateOptions.max)) {
            yupValidation = yupValidation
                .when('max', {
                    is: true,
                    then: Yup.number()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.NumberSchema) => {
                    return schema.max(field.templateOptions!.max!, validationMessage('max', value, field, formikProps));
                });
        }
    }

    return yupValidation;
};

const makeValidationForMixed = (value: any, field: IFormlyFieldConfig) => {
    let yupValidation =  Yup.mixed();

    if (field.templateOptions && field.templateOptions.required) {
        yupValidation = yupValidation
            .when('required', {
                is: true,
                then: Yup.mixed()
            })
            .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.Schema<string>) => {
                return schema.required(validationMessage('required', value, field, formikProps));
            });
    }

    return yupValidation;
};

const makeValidationForString = (value: any, field: IFormlyFieldConfig) => {
    let yupValidation =  Yup.string();

    if (field.templateOptions) {
        if (field.templateOptions.required) {
            yupValidation = yupValidation
                .when('required', {
                    is: true,
                    then: Yup.string()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.Schema<string>) => {
                    return schema.required(validationMessage('required', value, field, formikProps));
                });

            //yupValidation = yupValidation.required(validationMessage('required', value, field, context.formlyProps));
        }

        if (UtilityHelper.isNumber(field.templateOptions.minLength)) {
            yupValidation = yupValidation
                .when('min', {
                    is: true,
                    then: Yup.string()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.StringSchema) => {
                    return schema.min(field.templateOptions!.minLength!, validationMessage('minLength', value, field, formikProps));
                });
        }

        if (UtilityHelper.isNumber(field.templateOptions.maxLength)) {
            yupValidation = yupValidation
                .when('max', {
                    is: true,
                    then: Yup.string()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.StringSchema) => {
                    return schema.max(field.templateOptions!.maxLength!, validationMessage('maxLength', value, field, formikProps));
                });
        }

        if (UtilityHelper.isNumber(field.templateOptions.min)) {
            yupValidation = yupValidation
                .when('min', {
                    is: true,
                    then: Yup.number()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.NumberSchema) => {
                    return schema.min(field.templateOptions!.min!, validationMessage('min', value, field, formikProps));
                });
        }

        if (UtilityHelper.isNumber(field.templateOptions.max)) {
            yupValidation = yupValidation
                .when('max', {
                    is: true,
                    then: Yup.number()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.NumberSchema) => {
                    return schema.max(field.templateOptions!.max!, validationMessage('max', value, field, formikProps));
                });
        }
    }

    return yupValidation;
};*/

const makeValidationForLazy = (value: any, field: IFormlyFieldConfig) => {
    const validations: Yup.Schema<any>[] = [];

    if (field.templateOptions) {
        if (field.templateOptions.required) {
            validations.push(Yup.string()
                .when('required', {
                    is: true,
                    then: Yup.mixed()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.Schema<string>) => {
                    return schema.required(validationMessage('required', value, field, formikProps));
                }));
        }

        if (UtilityHelper.isNumber(field.templateOptions.minLength)) {
            validations.push(Yup.string()
                .when('min', {
                    is: true,
                    then: Yup.string()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.StringSchema) => {
                    return schema.min(field.templateOptions!.minLength!, validationMessage('minLength', value, field, formikProps));
                }));
        }

        if (UtilityHelper.isNumber(field.templateOptions.maxLength)) {
            validations.push(Yup.string()
                .when('max', {
                    is: true,
                    then: Yup.string()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.StringSchema) => {
                    return schema.max(field.templateOptions!.maxLength!, validationMessage('maxLength', value, field, formikProps));
                }));
        }
    }

    if (UtilityHelper.isEmpty(validations)) {
        return Yup.mixed();
    }

    return combineValidations(validations)!;
};

const makeValidationObjectRecursive = (field: IFormlyFieldConfig, validationObject: KeyValueObject<Yup.Schema<any> | Yup.Lazy>) => {
    const fieldType = RcFormlyConfig.getType(field.type!);

    if (fieldType) {
        validationObject[field.key!] = Yup.lazy((value) => {
            const lazyValidation = makeValidationForLazy(value, field);

            if (UtilityHelper.isArray(fieldType.validators)) {
                return combineValidations([lazyValidation, ...fieldType.validators!])!;
            }

            return lazyValidation;
        });
    }

    let fieldGroup = field.fieldArray?.fieldGroup || field.fieldGroup;

    if (UtilityHelper.isNotEmpty(fieldGroup)) {
        fieldGroup?.forEach((field) => {
            makeValidationObjectRecursive(field, validationObject);
        })
    }
};

export const makeValidationForFields = (fields: IFormlyFieldConfig[]) => {
    const validationObject: KeyValueObject<Yup.Schema<any> | Yup.Lazy> = {};

    fields.forEach((field) => {
        makeValidationObjectRecursive(field, validationObject);
    });

    return Yup.object().shape(validationObject);
};
