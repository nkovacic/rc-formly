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

    protected isType() {
        return !UtilityHelper.isEmpty(this.props.field.key);
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
        return !UtilityHelper.equals(this.currentValue, this.getFieldValue(nextProps)) || !UtilityHelper.equals(this.props.field, nextProps.field);
    }

    handleBlur = () => {
        if (this.hasFormikProps()) {
            this.props.formikFormlyProps.formikProps.handleBlur(this.props.field.key);
        }
    }

    handleChange = (newValue: any) => {
        if (this.hasFormikProps()) {
            const oldValue = this.getFieldValue();

            this.props.formikFormlyProps.formikProps.setFieldValue(this.props.field.key!, newValue);

            if (this.hasTemplateOptions() && this.props.field.templateOptions!.onChange) {
                this.props.field.templateOptions!.onChange(newValue, oldValue, this.props.formikFormlyProps);
            }
        }
    }

    getFieldValue(): any;
    getFieldValue(otherProps: FormikFormlyFieldProps): any;
    getFieldValue(otherProps?: FormikFormlyFieldProps) {
        const sourceProps = otherProps ? otherProps : this.props;

        if (sourceProps.formikFormlyProps.formikProps.values && sourceProps.field.key) {
            return sourceProps.formikFormlyProps.formikProps.values[sourceProps.field.key!];
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
