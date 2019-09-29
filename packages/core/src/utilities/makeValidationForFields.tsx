import { FormikProps } from 'formik';
import * as Yup from 'yup';

import { IFormlyFieldConfig } from '../formikFormlyFieldConfig';
import { FormikFormlyConfig } from '../FormikFormlyConfig';

import { UtilityHelper } from './UtilityHelper';

export interface IFormikFormlyYupContext {
    formlyProps: FormikProps<any>;
}

const validationMessage = (validatorName: string, value: any, field: IFormlyFieldConfig, formikProps: FormikProps<any>) => {
    const validatorMessageOption = FormikFormlyConfig.getValidatorMessage(validatorName);

    if (validatorMessageOption) {
        return validatorMessageOption.message(value, field, formikProps);
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
                .when('minLength', { 
                    is: true,
                    then: Yup.string()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.StringSchema) => {
                    return schema.min(field.templateOptions!.minLength!, validationMessage('minLength', value, field, formikProps));
                });
        }

        if (UtilityHelper.isNumber(field.templateOptions.maxLength)) {
            yupValidation = yupValidation
                .when('maxLength', { 
                    is: true,
                    then: Yup.string()
                })
                .when('$formikProps', (formikProps: FormikProps<any>, schema: Yup.StringSchema) => {
                    return schema.max(field.templateOptions!.maxLength!, validationMessage('maxLength', value, field, formikProps));
                });
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
