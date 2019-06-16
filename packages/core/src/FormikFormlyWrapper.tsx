import { Component } from 'react';

import { IFormlyFieldConfig } from './formikFormlyFieldConfig';
import { IFormikFormlyProps } from './FormikFormlyProps';

import { UtilityHelper } from 'app/utilities';

export interface FormikFormlyWrapperProps {
    formikFormlyProps: IFormikFormlyProps;
    parentField: IFormlyFieldConfig;
}

class FormikFormlyWrapper extends Component<FormikFormlyWrapperProps> {
    protected hasFormikProps() {
        return UtilityHelper.isDefined(this.props) && UtilityHelper.isDefined(this.props.formikFormlyProps);
    }

    protected hasTemplateOptions() {
        return !UtilityHelper.isEmpty(this.props.parentField.templateOptions);
    }
}

export default FormikFormlyWrapper;
