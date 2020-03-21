import React, { Component } from 'react';

import { IRcFormlyProps, IFormlyTypeDefinition, IFormlyFieldConfig } from './types';

import RcFormlyFieldRenderer from './RcFormlyFieldRenderer';

import { KeyValueObject } from './types';
import { UtilityHelper } from './utilities';

export interface RcFromlyArrayHelpers<T = any> {
    insert: (index: number, value: any) => void;
    move: (from: number, to: number) => void;
    pop(): T | undefined
    push: (obj: any) => void;
    remove(index: number): T | undefined;
    replace: (index: number, value: any) => void;
    swap: (indexA: number, indexB: number) => void;
    unshift: (value: any) => number;
}

export interface RcFormlyArrayFieldProps {
    field: IFormlyFieldConfig;
    fieldType: IFormlyTypeDefinition;
    formlyArrayHelpers: RcFromlyArrayHelpers;
    formlyProps: IRcFormlyProps;
    model: KeyValueObject;
}

export class RcFormlyArrayField extends Component<RcFormlyArrayFieldProps> {
    public get to() {
        return this.props.field.templateOptions;
    }

    protected getFieldKey() {
        return this.props.field.key!;
    }

    protected getFieldValue(fieldName = this.getFieldKey()) {
        if (fieldName.includes('.')) {
            return UtilityHelper.getDotNotationPropertyValue(this.props.formlyProps?.formProps?.values, fieldName);
        }

        return this.props.formlyProps?.formProps?.values[fieldName];
    }

    protected insertValue(index: number, value: any) {
        this.props.formlyArrayHelpers.insert(index, value);
    }

    protected moveValue(from: number, to: number) {
        this.props.formlyArrayHelpers.move(from, to);
    }

    protected popValue<T = any>() {
        return this.props.formlyArrayHelpers.pop() as T | undefined;
    }

    protected pushValue(obj: any) {
        this.props.formlyArrayHelpers.push(obj);
    }

    protected removeValue(index: number) {
        this.props.formlyArrayHelpers.remove(index);
    }

    protected replaceValue(index: number, value: any) {
        this.props.formlyArrayHelpers.replace(index, value);
    }

    protected swapValue(indexA: number, indexB: number) {
        this.props.formlyArrayHelpers.swap(indexA, indexB);
    }

    protected unshift(value: any) {
        return this.props.formlyArrayHelpers.unshift(value);
    }

    protected renderFieldGroup(fieldGroup?: IFormlyFieldConfig[]) {
        if (UtilityHelper.isEmpty(fieldGroup)) {
            fieldGroup = this.props.field.fieldArray?.fieldGroup;
        }

        if (UtilityHelper.isNotEmpty(fieldGroup)) {
            return (
                <RcFormlyFieldRenderer fields={fieldGroup!} formlyProps={this.props.formlyProps} />
            );
        }

        return null;
    }

    protected submitForm() {
        this.props.formlyProps?.submit();
    }
}
