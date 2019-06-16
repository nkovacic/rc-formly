import { IFormlyFieldConfig } from './formikFormlyFieldConfig';
import { FormikProps } from 'formik';

export interface IFormikFormlyProps {
    changeFieldConfig(fieldKey: string, changeFieldConfigFunction: (existingFieldConfig: IFormlyFieldConfig) => IFormlyFieldConfig): void;
    changeFieldConfigs(changeFieldConfigsFunction: (existingFieldConfigs: IFormlyFieldConfig[]) => IFormlyFieldConfig[]): void;
    resetForm(resetFormValuesFunction: (existingValues: any) => any): void;
    resetForm(values: any): void;
    submit(): void;
    formikProps: FormikProps<any>;
}