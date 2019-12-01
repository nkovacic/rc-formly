import { Component } from 'react';

import { IFormlyFieldConfig } from './RcFormlyFieldConfig';
import { IFormlyTypeDefinition } from './RcFormlyConfig';
import { IRcFormlyProps } from './RcFormlyProps';

import { UtilityHelper } from './utilities';
import { KeyValueObject } from './types';

export interface RcFormlyFieldProps {
    field: IFormlyFieldConfig;
    fieldType: IFormlyTypeDefinition;
    formlyProps: IRcFormlyProps;
    model: KeyValueObject;
}

class RcFormlyField extends Component<RcFormlyFieldProps> {
    private currentValue: any;

    constructor(props: RcFormlyFieldProps) {
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
        return this.hasFormProps() && UtilityHelper.isNotEmpty(this.props.formlyProps.formProps.touched[this.getFieldKey()]);
    }

    private hasFormProps() {
        return UtilityHelper.isDefined(this.props) && UtilityHelper.isDefined(this.props.formlyProps);
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

    shouldComponentUpdate(nextProps: RcFormlyFieldProps) {
        return !UtilityHelper.equals(this.currentValue, this.getFieldValue(nextProps)) 
            || !UtilityHelper.equals(this.props.field, nextProps.field)
            || !UtilityHelper.equals(
                this.props.formlyProps.formProps.errors[this.getFieldKey()], 
                nextProps.formlyProps.formProps.errors[this.getFieldKey()])
            || !UtilityHelper.equals(
                this.props.formlyProps.formProps.touched[this.getFieldKey()], 
                nextProps.formlyProps.formProps.touched[this.getFieldKey()]);
    }

    handleBlur = () => {
        if (this.hasFormProps()) {
            this.props.formlyProps.setFieldTouched(this.getFieldKey(), true);
        }
    }

    handleChange = (newValue: any) => {
        if (this.hasFormProps()) {
            const oldValue = this.getFieldValue();

            this.props.formlyProps.setFieldValue(this.getFieldKey(), newValue);

            if (this.hasTemplateOptions() && this.props.field.templateOptions!.onChange) {
                this.props.field.templateOptions!.onChange(newValue, oldValue, this.props.formlyProps);
            }
        }
    }

    getFieldValue(): any;
    getFieldValue(otherProps: RcFormlyFieldProps): any;
    getFieldValue(otherProps?: RcFormlyFieldProps) {
        const sourceProps = otherProps ? otherProps : this.props;

        if (sourceProps.formlyProps.formProps.values && sourceProps.field.key) {
            return sourceProps.formlyProps.formProps.values[sourceProps.field.key!];
        }

        return null;
    }

    submitForm() {
        if (this.hasFormProps()) {
            this.props.formlyProps.submit();
        }
    }
}

export default RcFormlyField;
