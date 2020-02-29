import React, { FC } from 'react';
import { FieldArray } from 'formik';

import { IFormlyFieldConfig, IRcFormlyProps } from './types';

import { useFormlyConfig } from './hooks';

import { UtilityHelper } from './utilities';

interface RcFormlyFieldRendererProps {
    fields: IFormlyFieldConfig[];
    formlyProps: IRcFormlyProps;
}

export const RcFormlyFieldRenderer: FC<RcFormlyFieldRendererProps> = (props) => {
    const { fields, formlyProps } = props;

    const { getType, getWrapper } = useFormlyConfig();

    const renderFields = (fields: IFormlyFieldConfig[]): any =>  {
        return fields.map((field, index) => {
            if (UtilityHelper.isNotEmpty(field.wrappers)) {
                return renderWrappers(field, [...field.wrappers!], formlyProps, index);
            }

            if (!field.type && UtilityHelper.isNotEmpty(field.fieldGroup)) {
                return renderFields(field.fieldGroup!);
            }

            return renderType(field);
        });
    }

    const renderType = (field: IFormlyFieldConfig) => {
        const fieldType = getType(field.type!);

        if (fieldType && !field.hide) {
            // tslint:disable-next-line:variable-name
            const FieldComponent = fieldType.component;

            if (field.fieldArray) {
                return (
                    <FieldArray
                        key={field.id}
                        name={field.key!}
                        render={({ form, name, ...otherProps }) => (
                            <FieldComponent field={field} fieldType={fieldType}
                                formlyArrayHelpers={otherProps}
                                formlyProps={formlyProps} styles={field.style}
                            />
                        )}
                    />
                )
            }

            return (
                <FieldComponent key={field.id} field={field} fieldType={fieldType}
                    formlyProps={formlyProps} styles={field.style}
                />
            );
        }

        return null;
    }

    const renderWrappers = (
        field: IFormlyFieldConfig, wrappers: string[],
        formlyProps: IRcFormlyProps, fieldIndex?: number): JSX.Element[] | JSX.Element | null => {
        if (UtilityHelper.isEmpty(wrappers)) {
            if (field.type) {
                return renderType(field);
            }

            if (!UtilityHelper.isEmpty(field.fieldGroup)) {
                return renderFields(field.fieldGroup!) as JSX.Element[];
            }

            return null;
        }

        const wrapper = wrappers.pop();
        const fieldWrapper = getWrapper(wrapper!);

        if (fieldWrapper) {
            // tslint:disable-next-line:variable-name
            const WrapperComponent = fieldWrapper.component;

            return (
                <WrapperComponent key={fieldIndex} parentField={field} formlyProps={formlyProps} >
                    {renderWrappers(field, wrappers, formlyProps, fieldIndex)}
                </WrapperComponent>
            );
        }

        return renderWrappers(field, wrappers, formlyProps);
    }

    return renderFields(fields)
}

export default RcFormlyFieldRenderer;
