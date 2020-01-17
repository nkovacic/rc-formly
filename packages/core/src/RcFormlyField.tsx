import { Component } from 'react';

import { IRcFormlyProps, IFormlyFieldConfig } from './RcFormlyFieldConfig';
import { IFormlyTypeDefinition } from './RcFormlyConfig';

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

    public get to() {
        return this.props.field.templateOptions;
    }

    constructor(props: RcFormlyFieldProps) {
        super(props);

        this.saveCurrentValue();
    }

    protected getFieldKey() {
        return this.props.field.key!;
    }

    protected getFieldError() {
        const fieldKey = this.getFieldKey();

        if (fieldKey) {
            return UtilityHelper.getDotNotationPropertyValue(this.props.formlyProps.formProps.errors, fieldKey);
        }

        return null;
    }

    protected hasErrors() {
        return UtilityHelper.isNotEmpty(this.getFieldError());
    }

    protected wasFieldTouched() {
        const fieldKey = this.getFieldKey();

        if (fieldKey) {
            return UtilityHelper.getDotNotationPropertyValue<boolean>(this.props.formlyProps.formProps.touched, fieldKey) || false;
        }

        return false;
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
        if (this.hasFormProps()) {
            const fieldKey = this.getFieldKey();
            const { errors, touched } = this.props.formlyProps.formProps;
            const { errors: nextErrors, touched: nextTouched } = nextProps.formlyProps.formProps;

            return UtilityHelper.notEquals(this.currentValue, this.getFieldValue(nextProps))
                || UtilityHelper.getDotNotationPropertyValue(errors, fieldKey) !== UtilityHelper.getDotNotationPropertyValue(nextErrors, fieldKey)
                || UtilityHelper.getDotNotationPropertyValue(touched, fieldKey) !== UtilityHelper.getDotNotationPropertyValue(nextTouched, fieldKey)
                || UtilityHelper.equals(this.props.field, nextProps.field);
        }

        return false;
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
            return UtilityHelper.getDotNotationPropertyValue(sourceProps.formlyProps.formProps.values, sourceProps.field.key);
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
