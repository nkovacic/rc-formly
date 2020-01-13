import React, { Component } from 'react';
import { RcFormlyArrayField } from '@rc-formly/core';

export class RepeatValueArrayType extends RcFormlyArrayField {
    addNewVlaue = () => {

    }

    render() {
        const value = this.getFieldValue() as any[];

        return (
            <div>
                { this.renderFieldGroup() }
                { value?.map(q => <div>{q}</div>)}
                <div>
                    <button onClick={this.addNewVlaue} type="button">
                        Add new value
                    </button>
                </div>
            </div>
        );
    }
}