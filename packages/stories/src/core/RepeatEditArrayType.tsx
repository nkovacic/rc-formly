import React from 'react';
import styled from 'styled-components';
import { RcFormlyArrayField, IFormlyFieldConfig } from '@rc-formly/core';

import { UtilityHelper } from '../UtilityHelper';

const FlexDiv = styled.div({
    display: 'flex',
    flexDirection: 'row'
});

export class RepeatEditArrayType extends RcFormlyArrayField {
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
        let fieldGroup = this.props.field.fieldArray?.fieldGroup?.map(q => {
            const keyAfterArrayKey = UtilityHelper.getDotNotationPropertyLast(q.key);

            return {
                ...q,
                key: `${this.props.field.key}.${index}.${keyAfterArrayKey}`
            } as IFormlyFieldConfig;
        });

        return (
            <FlexDiv className="list-item-wrapper">
                <div>
                    { this.renderFieldGroup(fieldGroup) }
                </div>
                <button onClick={() => this.removeValue(index)} type="button">
                    Remove
                </button>
            </FlexDiv>
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
                <FlexDiv>
                    <div>
                        { this.renderFieldGroup() }
                    </div>
                    <button onClick={this.addNewVlaue} type="button">
                        Add new value
                    </button>
                </FlexDiv>
                { this.renderItems() }
            </div>
        );
    }
}
