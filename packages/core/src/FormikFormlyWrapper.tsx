import React, { Component } from 'react';
import { ViewProps } from 'react-native';

import { IFormlyFieldConfig } from './formikFormlyFieldConfig';
import { IFormikFormlyProps } from './FormikFormlyProps';

import { UtilityHelper, Logger } from 'app/services';

export interface FormikFormlyWrapperProps extends ViewProps {
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

    shouldComponentUpdate(nextProps: FormikFormlyWrapperProps) {
        return true;
    }
}

export default FormikFormlyWrapper;
