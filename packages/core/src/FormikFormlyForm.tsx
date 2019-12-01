import React, { Component } from 'react';
import { Formik, FormikProps, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

import { IFormlyFieldConfig } from './formikFormlyFieldConfig';
import { IRcFormlyProps } from './FormikFormlyProps';

import RootFormikFormlyWrapper from './RootFormikFormlyWrapper';

import { makeValidationForFields, FormFieldHelper, UtilityHelper } from './utilities';

export interface IFormikyFormlyFormRef {
    resetForm(resetFormValuesFunction: (existingValues: any) => any): void;
    resetForm(values: any): void;
    submit(): void;
}

interface Props {
    render?(props: FormikProps<any>, renderFields: () => React.ReactNode): React.ReactNode;
    onSubmit?(model: any, formikProps: FormikProps<any>): void;
    onValidate?(model: any, isValid: boolean): void;
    fields: IFormlyFieldConfig[];
    model?: any;
    enableFieldConfigsReinitialize?: boolean;
}

interface State {
    fields: IFormlyFieldConfig[];
}

class FormikFormlyForm extends Component<Props, State> implements IFormikyFormlyFormRef {
    private isFormSubmitting: boolean = false;
    private validationSchema: Yup.ObjectSchema<any> | null = null;

    public formikInstance: Formik | null = null;
    public formikProps: FormikProps<any> | null = null;

    static defaultProps: Partial<Props> = {
        enableFieldConfigsReinitialize: true
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            fields: this.props.fields
        };
    }

    private changeFieldConfig = (fieldKey: string, changeFieldConfigFunction: (existingFieldConfig: IFormlyFieldConfig) => IFormlyFieldConfig) => {
        this.setState({
            fields: FormFieldHelper.replaceField(fieldKey, this.state.fields, changeFieldConfigFunction)
        });
    }

    private changeFieldConfigs = (changeFieldConfigsFunction: (existingFieldConfigs: IFormlyFieldConfig[]) => IFormlyFieldConfig[]) => {
        const newFields = changeFieldConfigsFunction(this.state.fields);

        this.setState({
            fields: newFields
        });
    }

    getFormlyProps() {
        return {
            changeFieldConfig: this.changeFieldConfig,
            changeFieldConfigs: this.changeFieldConfigs,
            resetForm: this.resetForm,
            setFieldError: this.formikProps!.setFieldError,
            setFieldTouched: this.formikProps!.setFieldTouched,
            setFieldValue: this.formikProps!.setFieldValue,
            submit: this.submit,
            formProps: {
                errors: this.formikProps!.errors,
                touched: this.formikProps!.touched,
                values: this.formikProps!.values
            }
        } as IRcFormlyProps; 
    }

    resetForm = (valuesOrResetFunction: any) => {
        if (this.formikProps) {
            if (UtilityHelper.isFunction(valuesOrResetFunction)) {
                const newValues = valuesOrResetFunction(this.formikProps.values) || {};

                this.formikProps.resetForm(newValues);
            }
            else {
                this.formikProps.resetForm(valuesOrResetFunction);
            }      
        }
    }

    onFormikSubmit = (model: any) => {
        if (this.props.onSubmit) {
            this.props.onSubmit(model, this.formikProps!);
        }
    }

    onFormikValidate = (model: any) => {
        return new Promise((resolve, reject) => {
            if (UtilityHelper.isEmpty(this.validationSchema)) {
                this.validationSchema = makeValidationForFields(this.props.fields);
            }  

            this.validationSchema!
                .validate(model, { abortEarly: false, context: { formikProps: this.formikProps } })
            //validateYupSchema(model, this.validationSchema)
                .then(
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
    }

    submit = () => {
        if (!this.isFormSubmitting && this.formikInstance) {
            this.formikInstance.submitForm();
        }
    }

    renderFields = () => {
        const formlyProps = this.getFormlyProps();

        return (
            <RootFormikFormlyWrapper fields={this.state.fields} formlyProps={formlyProps} />
        );
    }

    render() {
        const formInitialValues = this.props.model || {};

        if (!UtilityHelper.isEmpty(this.state.fields)) {
            return (
                <Formik
                    ref={(node: any) => this.formikInstance = node}
                    //enableReinitialize={true}
                    initialValues={formInitialValues}
                    onSubmit={this.onFormikSubmit}
                    validate={this.onFormikValidate}
                    render={(props: FormikProps<any>) => {
                        this.formikProps = props;
                        this.isFormSubmitting = props.isSubmitting;

                        if (this.props.render) {
                            return this.props.render(this.formikProps, this.renderFields);
                        }

                        return this.renderFields();
                    }}
                />
            );
        }

        return null;
    }
}

export default FormikFormlyForm;
