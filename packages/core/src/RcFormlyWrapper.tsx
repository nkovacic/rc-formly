import { Component } from 'react';

import { IFormlyFieldConfig } from './RcFormlyFieldConfig';
import { IRcFormlyProps } from './RcFormlyProps';

import { UtilityHelper } from './utilities';

export interface RcFormlyWrapperProps {
    formlyProps: IRcFormlyProps;
    parentField: IFormlyFieldConfig;
}

class RcFormlyWrapper extends Component<RcFormlyWrapperProps> {
    protected hasFormProps() {
        return UtilityHelper.isDefined(this.props) && UtilityHelper.isDefined(this.props.formlyProps);
    }

    protected hasTemplateOptions() {
        return !UtilityHelper.isEmpty(this.props.parentField.templateOptions);
    }
}

export default RcFormlyWrapper;
