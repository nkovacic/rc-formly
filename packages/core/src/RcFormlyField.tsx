import { Component } from 'react';

import { RcFormlyFieldProps } from './types';

import { UtilityHelper } from './utilities';

class RcFormlyField<TFormlyTemplateOptions = {}> extends Component<RcFormlyFieldProps<TFormlyTemplateOptions>> {
    private currentValue: any;
    private changeAdditionalData: any[] | undefined;

    public get to() {
        return this.props.field.templateOptions;
    }

    constructor(props: RcFormlyFieldProps<TFormlyTemplateOptions>) {
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

    protected wasFormSubmitted() {
        return this.props.formlyProps?.formProps.submitCount > 0;
    }

    private hasFormProps() {
        return UtilityHelper.isDefined(this.props) && UtilityHelper.isDefined(this.props.formlyProps);
    }

    private saveCurrentValue() {
        this.currentValue = this.getFieldValue();
    }

    componentDidUpdate() {
        if (this.to?.onChange) {
            const newValue = this.getFieldValue();

            if (this.currentValue !== newValue) {
                this.changeAdditionalData = this.changeAdditionalData || [];

                this.to.onChange(newValue, this.currentValue, this.props.formlyProps, ...this.changeAdditionalData);

                delete this.changeAdditionalData;
            }
        }

        this.saveCurrentValue();
    }

    shouldComponentUpdate(nextProps: RcFormlyFieldProps) {
        if (this.hasFormProps()) {
            const fieldKey = this.getFieldKey();
            const { errors, touched } = this.props.formlyProps.formProps;
            const { errors: nextErrors, touched: nextTouched } = nextProps.formlyProps.formProps;

            return this.currentValue !== this.getFieldValue(nextProps)
                || UtilityHelper.getDotNotationPropertyValue(errors, fieldKey) !== UtilityHelper.getDotNotationPropertyValue(nextErrors, fieldKey)
                || UtilityHelper.getDotNotationPropertyValue(touched, fieldKey) !== UtilityHelper.getDotNotationPropertyValue(nextTouched, fieldKey)
                || UtilityHelper.notEquals(this.props.field, nextProps.field);
        }

        return false;
    }

    handleBlur = () => {
        if (this.hasFormProps()) {
            this.props.formlyProps.setFieldTouched(this.getFieldKey(), true);
        }
    }

    handleChange = (newValue: any, ...additionalData: any[]) => {
        if (this.hasFormProps()) {
            if (this.props.field.templateOptions?.onChange) {
                this.changeAdditionalData = additionalData;
            }

            this.props.formlyProps.setFieldValue(this.getFieldKey(), newValue);
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
