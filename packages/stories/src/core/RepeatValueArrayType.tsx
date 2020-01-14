import React, { Component } from 'react';
import { RcFormlyArrayField } from '@rc-formly/core';

import { UtilityHelper } from '../UtilityHelper';

export class RepeatValueArrayType extends RcFormlyArrayField {
    addNewVlaue = () => {
        let value: any = {};
        const properties =  this.props.field.fieldArray?.fieldGroup?.map(q => q.key) as string[];

        if (properties) {
            properties.forEach(property => {
                const propertyValue = this.getFieldValue(property);
                const lastProperty = UtilityHelper.getDotNotationPropertyLast(property);

                if (lastProperty) {
                    value[lastProperty] = propertyValue;
                }

                this.props.formlyProps.setFieldValue(property, '');
            });

            this.pushValue(value);
        }
    }

    renderListItem = (item: any, index: number) => {
        let header = '';
        let subHeader = '';

        if (this.to?.headerProp) {
            const property = UtilityHelper.getDotNotationPropertyLast(this.to?.headerProp);

            header = UtilityHelper.getDotNotationPropertyValue(item, property);
        }

        if (this.to?.subHeaderProp) {
            const property = UtilityHelper.getDotNotationPropertyLast(this.to?.subHeaderProp);
            const subHeaderText = UtilityHelper.getDotNotationPropertyValue(item, property);

            if (header) {
                subHeader = subHeaderText;
            }
            else {
                header = subHeaderText;
            }
        }

        return (
            <div key={index} className="list-item-wrapper">
                <div>
                    {header}
                </div>
                <div>
                    {subHeader}
                </div>
            </div>
        );
    }

    renderItems() {
        const values = this.getFieldValue() as any[];

        if (UtilityHelper.isEmpty(values)) {
            return null;
        }

        return (
            <div className="list">
                { values.map(this.renderListItem) }
            </div>
        );
    }


    render() {
        return (
            <div>
                { this.renderFieldGroup() }
                { this.renderItems() }
                <div>
                    <button onClick={this.addNewVlaue} type="button">
                        Add new value
                    </button>
                </div>
            </div>
        );
    }
}
