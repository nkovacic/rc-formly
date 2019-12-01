import { Component } from 'react';

import { IFormlyFieldConfig } from './RcFormlyFieldConfig';
import { IRcFormlyProps } from './FormikFormlyProps';

import { UtilityHelper } from './utilities';

export interface FormikFormlyWrapperProps {
    formlyProps: IRcFormlyProps;
    parentField: IFormlyFieldConfig;
}

class FormikFormlyWrapper extends Component<FormikFormlyWrapperProps> {
    protected hasFormikProps() {
        return UtilityHelper.isDefined(this.props) && UtilityHelper.isDefined(this.props.formlyProps);
    }

    protected hasTemplateOptions() {
        return !UtilityHelper.isEmpty(this.props.parentField.templateOptions);
    }
}

export default FormikFormlyWrapper;
