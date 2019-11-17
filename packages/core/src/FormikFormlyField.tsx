import { Component } from 'react';

import { IFormlyFieldConfig } from './formikFormlyFieldConfig';
import { IFormlyTypeDefinition } from './FormikFormlyConfig';
import { IFormikFormlyProps } from './FormikFormlyProps';

import { UtilityHelper } from './utilities';
import { KeyValueObject } from './types';

export interface FormikFormlyFieldProps {
    field: IFormlyFieldConfig;
    fieldType: IFormlyTypeDefinition;
    formikFormlyProps: IFormikFormlyProps;
    model: KeyValueObject;
}

class FormikFormlyField extends Component<FormikFormlyFieldProps> {
    private currentValue: any;

    constructor(props: FormikFormlyFieldProps) {
        super(props);

        this.saveCurrentValue();
    }

    protected getFieldKey() {
        return this.props.field.key!;
    }

    protected isType() {
        return UtilityHelper.isNotEmpty(this.props.field.key);
    }
    
    protected wasFieldTouched() {
        return this.hasFormikProps() && UtilityHelper.isNotEmpty(this.props.formikFormlyProps.formProps.touched[this.getFieldKey()]);
    }

    private hasFormikProps() {
        return UtilityHelper.isDefined(this.props) && UtilityHelper.isDefined(this.props.formikFormlyProps);
    }

    private hasTemplateOptions() {
        return !UtilityHelper.isEmpty(this.props.field.templateOptions);
    }

    private saveCurrentValue() {
        this.currentValue = this.getFieldValue();
    }

    componentDidUpdate() {
        this.saveCurrentValue();
    }

    shouldComponentUpdate(nextProps: FormikFormlyFieldProps) {
        return !UtilityHelper.equals(this.currentValue, this.getFieldValue(nextProps)) 
            || !UtilityHelper.equals(this.props.field, nextProps.field)
            || !UtilityHelper.equals(
                this.props.formikFormlyProps.formProps.errors[this.getFieldKey()], 
                nextProps.formikFormlyProps.formProps.errors[this.getFieldKey()])
            || !UtilityHelper.equals(
                this.props.formikFormlyProps.formProps.touched[this.getFieldKey()], 
                nextProps.formikFormlyProps.formProps.touched[this.getFieldKey()]);
    }

    handleBlur = () => {
        if (this.hasFormikProps()) {
            this.props.formikFormlyProps.setFieldTouched(this.getFieldKey(), true);
        }
    }

    handleChange = (newValue: any) => {
        if (this.hasFormikProps()) {
            const oldValue = this.getFieldValue();

            this.props.formikFormlyProps.setFieldValue(this.getFieldKey(), newValue);

            if (this.hasTemplateOptions() && this.props.field.templateOptions!.onChange) {
                this.props.field.templateOptions!.onChange(newValue, oldValue, this.props.formikFormlyProps);
            }
        }
    }

    getFieldValue(): any;
    getFieldValue(otherProps: FormikFormlyFieldProps): any;
    getFieldValue(otherProps?: FormikFormlyFieldProps) {
        const sourceProps = otherProps ? otherProps : this.props;

        if (sourceProps.formikFormlyProps.formProps.values && sourceProps.field.key) {
            return sourceProps.formikFormlyProps.formProps.values[sourceProps.field.key!];
        }

        return null;
    }

    submitForm() {
        if (this.hasFormikProps()) {
            this.props.formikFormlyProps.submit();
        }
    }
}

export default FormikFormlyField;
