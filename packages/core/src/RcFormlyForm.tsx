import React, { Component } from 'react';
import { Formik, FormikProps, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

import { IFormlyFieldConfig, IRcFormlyProps, KeyValueObject } from './types';

import RcFormlyFieldRenderer from './RcFormlyFieldRenderer';

import { makeValidationForFields, FormFieldHelper, UtilityHelper } from './utilities';

export interface IRcFormlyFormRef<TModel = KeyValueObject> {
    resetForm(resetFormValuesFunction: (existingValues: TModel) => TModel): void;
    resetForm(values: TModel): void;
    submit(): void;
}

interface Props<TModel = KeyValueObject> {
    render?(props: IRcFormlyProps<TModel>, renderFields: () => React.ReactNode): React.ReactNode;
    onSubmit?(model: TModel, formlyProps: IRcFormlyProps<TModel>): void;
    onValidate?(model: TModel, isValid: boolean): void;
    fields: IFormlyFieldConfig[];
    model?: TModel;
    enableFieldConfigsReinitialize?: boolean;
}

interface State {
    fields: IFormlyFieldConfig[];
}

class RcFormlyForm extends Component<Props, State> implements IRcFormlyFormRef {
    private isFormSubmitting = false;

    private validationSchema: Yup.ObjectSchema<any> | null = null;

    public formikProps: FormikProps<any> | null = null;

    constructor(props: Props) {
        super(props);

        this.state = {
            fields: FormFieldHelper.proccessFields(this.props.fields, field => {
                field.id = UtilityHelper.createGuid();

                return field;
            })
        };
    }

    private changeFieldConfig = (fieldKey: string, changeFieldConfigFunction: (existingFieldConfig: IFormlyFieldConfig) => IFormlyFieldConfig) => {
        this.setState(
            {
                fields: FormFieldHelper.replaceField(fieldKey, this.state.fields, changeFieldConfigFunction)
            },
            () => {
                this.validationSchema = null;
            }
        );
    };

    private changeFieldConfigs = (changeFieldConfigsFunction: (existingFieldConfigs: IFormlyFieldConfig[]) => IFormlyFieldConfig[]) => {
        const newFields = changeFieldConfigsFunction(this.state.fields);

        this.setState(
            {
                fields: newFields
            },
            () => {
                this.validationSchema = null;
            }
        );
    };

    private replaceValues = (values: any) => {
        this.formikProps?.setValues(values);
    };

    private setValues = (changeValuesFunc: (values: any) => any) => {
        const newValues = changeValuesFunc(this.formikProps?.values);

        this.formikProps?.setValues(newValues);
    };

    getFormlyProps() {
        return {
            changeFieldConfig: this.changeFieldConfig,
            changeFieldConfigs: this.changeFieldConfigs,
            handleSubmit: this.formikProps!.handleSubmit,
            resetForm: this.resetForm,
            replaceValues: this.replaceValues,
            setFieldError: this.formikProps!.setFieldError,
            setFieldTouched: this.formikProps!.setFieldTouched,
            setFieldValue: this.formikProps!.setFieldValue,
            setValues: this.setValues,
            submit: this.submit,
            formProps: {
                errors: this.formikProps!.errors,
                touched: this.formikProps!.touched,
                submitCount: this.formikProps!.submitCount,
                values: this.formikProps!.values
            }
        } as IRcFormlyProps;
    }

    resetForm = (valuesOrResetFunction?: any) => {
        if (this.formikProps) {
            if (UtilityHelper.isNotEmpty(valuesOrResetFunction)) {
                if (UtilityHelper.isFunction(valuesOrResetFunction)) {
                    const newValues = valuesOrResetFunction(this.formikProps.values) || {};

                    this.formikProps.resetForm(newValues);
                } else {
                    this.formikProps.resetForm(valuesOrResetFunction);
                }
            } else {
                this.formikProps.resetForm(this.formikProps.initialValues);
            }
        }
    };

    onFormikSubmit = (model: any) => {
        if (this.props.onSubmit) {
            this.props.onSubmit(model, this.getFormlyProps());
        }
    };

    onFormikValidate = (model: any) => {
        return new Promise((resolve, reject) => {
            if (UtilityHelper.isEmpty(this.validationSchema)) {
                this.validationSchema = makeValidationForFields(this.state.fields);
            }

            this.validationSchema!.validate(model, { abortEarly: false, context: { formikProps: this.formikProps } }).then(
                () => {
                    if (this.props.onValidate) {
                        this.props.onValidate(model, true);
                    }

                    resolve({});
                },
                (err: any) => {
                    if (this.props.onValidate) {
                        this.props.onValidate(model, false);
                    }

                    reject(yupToFormErrors(err));
                }
            );
        });
    };

    submit = () => {
        if (!this.isFormSubmitting) {
            this.formikProps?.submitForm();
        }
    };

    renderFields = () => {
        const formlyProps = this.getFormlyProps();

        return <RcFormlyFieldRenderer fields={this.state.fields} formlyProps={formlyProps} />;
    };

    render() {
        const { model, render } = this.props;
        const { fields } = this.state;
        const formInitialValues = model || {};

        if (!UtilityHelper.isEmpty(fields)) {
            return (
                <Formik
                    // enableReinitialize={true}
                    initialValues={formInitialValues}
                    onSubmit={this.onFormikSubmit}
                    validate={this.onFormikValidate}
                    render={(props: FormikProps<any>) => {
                        this.formikProps = props;
                        this.isFormSubmitting = props.isSubmitting;

                        if (render) {
                            return render(this.getFormlyProps(), this.renderFields);
                        }

                        return this.renderFields();
                    }}
                />
            );
        }

        return null;
    }
}

export default RcFormlyForm;
