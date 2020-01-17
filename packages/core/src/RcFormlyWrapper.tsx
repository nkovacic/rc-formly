import { Component } from 'react';

import { IFormlyFieldConfig, IRcFormlyProps } from './RcFormlyFieldConfig';

import { UtilityHelper } from './utilities';

export interface RcFormlyWrapperProps {
    formlyProps: IRcFormlyProps;
    parentField: IFormlyFieldConfig;
}

class RcFormlyWrapper extends Component<RcFormlyWrapperProps> {
    public get to() {
        return this.props.parentField?.templateOptions;
    }

    protected getFieldKey() {
        return this.props.parentField?.key;
    }

    protected getFieldError() {
        const fieldKey = this.getFieldKey();

        if (fieldKey) {
            return UtilityHelper.getDotNotationPropertyValue(this.props.formlyProps.formProps.errors, fieldKey);
        }

        return null;
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

    protected hasErrors() {
        return UtilityHelper.isNotEmpty(this.getFieldError());
    }

    protected hasFormProps() {
        return UtilityHelper.isDefined(this.props) && UtilityHelper.isDefined(this.props.formlyProps);
    }

    protected hasTemplateOptions() {
        return !UtilityHelper.isEmpty(this.props.parentField.templateOptions);
    }


}

export default RcFormlyWrapper;
