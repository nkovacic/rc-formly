import { KeyValueObject } from "./types";

export declare type FormErrors<Values> = {
    [K in keyof Values]?: Values[K] extends object ? FormErrors<Values[K]> : string;
};
export declare type FormTouched<Values> = {
    [K in keyof Values]?: Values[K] extends object ? FormTouched<Values[K]> : boolean;
};

export interface IRcFormlyFormProps<T = any> {
    errors: FormErrors<T>;
    touched: FormTouched<T>;
    submitCount: number;
    values: T;
}

export interface IRcFormlyProps<TModel = any> {
    changeFieldConfig(fieldKey: string, changeFieldConfigFunction: (existingFieldConfig: IFormlyFieldConfig) => IFormlyFieldConfig): void;
    changeFieldConfigs(changeFieldConfigsFunction: (existingFieldConfigs: IFormlyFieldConfig[]) => IFormlyFieldConfig[]): void;
    handleSubmit?(e: React.FormEvent<any>): void;
    resetForm(): void;
    resetForm(values: TModel): void;
    resetForm(resetFormValuesFunction: (existingValues: TModel) => TModel): void;
    setFieldValue(field: string, value: any): void;
    setFieldError(field: string, message: string): void;
    setFieldTouched(field: string, isTouched?: boolean): void;
    setValues(changeValuesFunc: (values: any) => any): void;
    submit(): void;
    formProps: IRcFormlyFormProps<TModel>;
}

export interface IFormlyFieldConfig {
    /**
     * The model that stores all the data, where the model[key] is the value of the field
     */
    readonly model?: any;
    /**
     * The key that relates to the model. This will link the field value to the model
     */
    key?: string;
    /**
     * This allows you to specify the `id` of your field. Note, the `id` is generated if not set.
     */
    id?: string;
    /**
     * If you wish, you can specify a specific `name` for your field.
     * This is useful if you're posting the form to a server using techniques of yester-year.
     */
    name?: string;
    /**
     * This is reserved for the templates. Any template-specific options go in here.
     * Look at your specific template implementation to know the options required for this.
     */
    templateOptions?: IFormlyTemplateOptions;

    style?: KeyValueObject;

    wrappers?: string[];
    /**
     * Whether to hide the field. Defaults to false. If you wish this to be conditional use `hideExpression`
     */
    hide?: boolean;
    /**
     * A field group is a way to group fields together, making advanced layout very simple.
     * It can also be used to group fields that are associated with the same model.
     * (useful if it's different than the model for the rest of the fields).
     */
    fieldGroup?: IFormlyFieldConfig[];
    fieldArray?: IFormlyFieldConfig;
    /**
     * This should be a formly-field type added either by you or a plugin. More information over at Creating Formly Fields.
     */
    type?: string;
}

export interface IFormlyTemplateOptions {
    onChange?(newValue: any, oldValue: any, formlyProps: IRcFormlyProps): void;
    onPress?(): void;
    type?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
    cols?: number;
    description?: string;
    hidden?: boolean;
    max?: number;
    min?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
    required?: boolean;
    attributes?: {
        [key: string]: string | number;
    };
    [additionalProperties: string]: any;
}
