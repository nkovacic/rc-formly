import React, { Component } from 'react';
import { Formik, FormikProps, validateYupSchema, yupToFormErrors, Field } from 'formik';
import * as Yup from 'yup';

import { FormikFormlyConfig } from './FormikFormlyConfig';
import { IFormlyFieldConfig } from './formikFormlyFieldConfig';
import { IFormikFormlyProps } from './FormikFormlyProps';

import { makeValidationForFields, FormFieldHelper } from './utilities';
import { UtilityHelper, Logger } from 'app/services';
import RootFormikFormlyWrapper from './RootFormikFormlyWrapper';


export interface IFormikyFormlyFormRef {
    resetForm(resetFormValuesFunction: (existingValues: any) => any): void;
    resetForm(values: any): void;
    submit(): void;
}

interface Props {
    onSubmit?(model: any): void;
    onValidate?(model: any, isValid: boolean): void;
    fields: IFormlyFieldConfig[];
    model?: any;
    enableFieldConfigsReinitialize?: boolean;
}

interface State {
    fields: IFormlyFieldConfig[];
}

class FormikFormlyForm extends Component<Props, State> implements IFormikyFormlyFormRef {
    private formikInstance: Formik;
    private formikProps: FormikProps<any>;
    private isFormSubmitting: boolean;
    private validationSchema: Yup.ObjectSchema<any>;

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
        })
    }

    private changeFieldConfigs = (changeFieldConfigsFunction: (existingFieldConfigs: IFormlyFieldConfig[]) => IFormlyFieldConfig[]) => {

    }

    getFormikFormlyProps(): IFormikFormlyProps {
        return {
            changeFieldConfig: this.changeFieldConfig,
            changeFieldConfigs: this.changeFieldConfigs,
            resetForm: this.resetForm,
            submit: this.submit,
            formikProps: this.formikProps
        }
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
            this.props.onSubmit(model);
        }
    }

    onFormikValidate = (model: any) => {
        return new Promise((resolve, reject) => {
            const validationSchema = makeValidationForFields(this.props.fields);

            validateYupSchema(model, validationSchema).then(
                () => {
                    if (this.props.onValidate) {
                        this.props.onValidate(model, true);
                    }

                    resolve({});
                },
                (err: any) => {
                    if (this.props.onValidate) {
                        this.props.onValidate(model, true);
                    }

                    reject(yupToFormErrors(err));
                }
              );
        });
    }

    submit = () => {
        if (!this.isFormSubmitting) {
            this.formikInstance.submitForm();
        }
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

                        const formikFormlyProps = this.getFormikFormlyProps()

                        return (
                            <RootFormikFormlyWrapper fields={this.state.fields} formikFormlyProps={formikFormlyProps} />
                        ); // this.renderFields(this.props.fields, props);
                    }}
                />
            );
        }

        return null;
    }
}

export default FormikFormlyForm;
