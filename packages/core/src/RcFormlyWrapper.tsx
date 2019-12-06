import { Component } from 'react';

import { IFormlyFieldConfig } from './RcFormlyFieldConfig';
import { IRcFormlyProps } from './RcFormlyProps';

import { UtilityHelper } from './utilities';

export interface RcFormlyWrapperProps {
    formlyProps: IRcFormlyProps;
    parentField: IFormlyFieldConfig;
}

class RcFormlyWrapper extends Component<RcFormlyWrapperProps> {
    public get to() {
        return this.props.parentField.templateOptions;
    }

    protected getFieldError() {
        if (this.props.parentField.key) {
			const { errors } = this.props.formlyProps.formProps;

			if (UtilityHelper.isString(errors[this.props.parentField.key])) {
				return errors[this.props.parentField.key] as string;
			}
        }
        
        return null;
    }

    protected getFieldTouched() {
        if (this.props.parentField.key) {
			const { touched } = this.props.formlyProps.formProps;

			if (touched[this.props.parentField.key] === true) {
				return touched[this.props.parentField.key] as boolean;
			}
        }
        
        return null;
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
