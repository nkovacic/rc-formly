import { IFormlyFieldConfig } from './formikFormlyFieldConfig';

export declare type FormErrors<Values> = {
    [K in keyof Values]?: Values[K] extends object ? FormErrors<Values[K]> : string;
};
export declare type FormTouched<Values> = {
    [K in keyof Values]?: Values[K] extends object ? FormTouched<Values[K]> : boolean;
};

export interface IRcFormlyFormProps<T = any> {
    errors: FormErrors<T>;
    touched: FormTouched<T>;
    values: T;
}

export interface IRcFormlyProps {
    changeFieldConfig(fieldKey: string, changeFieldConfigFunction: (existingFieldConfig: IFormlyFieldConfig) => IFormlyFieldConfig): void;
    changeFieldConfigs(changeFieldConfigsFunction: (existingFieldConfigs: IFormlyFieldConfig[]) => IFormlyFieldConfig[]): void;
    resetForm(resetFormValuesFunction: (existingValues: any) => any): void;
    resetForm(values: any): void;
    setFieldValue(field: string, value: any): void;
    setFieldError(field: string, message: string): void;
    setFieldTouched(field: string, isTouched?: boolean): void;
    submit(): void;
    formProps: IRcFormlyFormProps<any>;
}