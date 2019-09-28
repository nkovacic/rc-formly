import { FormikProps } from 'formik';

import { IFormlyFieldConfig } from './formikFormlyFieldConfig';

export interface IFormikFormlyProps {
    changeFieldConfig(fieldKey: string, changeFieldConfigFunction: (existingFieldConfig: IFormlyFieldConfig) => IFormlyFieldConfig): void;
    changeFieldConfigs(changeFieldConfigsFunction: (existingFieldConfigs: IFormlyFieldConfig[]) => IFormlyFieldConfig[]): void;
    resetForm(resetFormValuesFunction: (existingValues: any) => any): void;
    resetForm(values: any): void;
    submit(): void;
    formikProps: FormikProps<any>;
}