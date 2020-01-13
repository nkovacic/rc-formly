import React, { Component } from 'react';
import { RcFormlyArrayField } from '@rc-formly/core';

export class RepeatValueArrayType extends RcFormlyArrayField {
    addNewVlaue = () => {
        const value = this.props.formlyProps.formProps.values[this.to.valueProp];

        this.pushValue(value);
        this.props.formlyProps.setFieldValue(this.to.valueProp, '');
    }

    render() {
        const value = this.getFieldValue() as any[];

        return (
            <div>
                { this.renderFieldGroup() }
                { value?.map((q, index) => <div key={index}>{q}</div>)}
                <div>
                    <button onClick={this.addNewVlaue} type="button">
                        Add new value
                    </button>
                </div>
            </div>
        );
    }
}