import { IFormlyFieldConfig } from '../formikFormlyFieldConfig';
import { UtilityHelper } from './UtilityHelper';

export class FormFieldHelper {
    private static getKeys(fields: IFormlyFieldConfig[], keys: string[]) {
        if (!UtilityHelper.isEmpty(fields)) {
            fields.forEach((field) => {
                if (field.key) {
                    keys.push(field.key);
                }

                if (field.fieldGroup) {
                    this.getKeys(field.fieldGroup, keys);
                }
            });
        }

        return keys;
    }

    static getFieldFromKey(fieldKey: string, fields: IFormlyFieldConfig[]): IFormlyFieldConfig | null {
        if (!UtilityHelper.isEmpty(fields)) {
            for (let i = 0, length = fields.length; i < length; i += 1) {
                if (fields[i].key === fieldKey) {
                    return fields[i];
                }

                if (!UtilityHelper.isEmpty(fields[i].fieldGroup)) {
                    const foundField = this.getFieldFromKey(fieldKey, fields[i].fieldGroup!);

                    if (foundField) {
                        return foundField;
                    }
                }
            }
        }

        return null;
    }

    static getAllKeys(fields: IFormlyFieldConfig[]) {
        return this.getKeys(fields, []);
    }

    static replaceField(
        fieldKey: string, 
        fields: IFormlyFieldConfig[], 
        changeFieldConfigFunction: (existingFieldConfig: IFormlyFieldConfig) => IFormlyFieldConfig) : IFormlyFieldConfig[] {
        if (UtilityHelper.isNotEmpty(fields)) {
            return fields.map((existingField) => {
                if (existingField.key === fieldKey) {                    
                    return changeFieldConfigFunction(existingField);
                }

                if (UtilityHelper.isNotEmpty(existingField.fieldGroup)) {
                    existingField.fieldGroup = this.replaceField(fieldKey, existingField.fieldGroup!, changeFieldConfigFunction);
                }

                return existingField;
            });
        }

        return fields;
    }
}
