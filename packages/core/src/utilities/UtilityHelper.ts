import deepmerge from 'deepmerge';
import { IConstructor } from './generics';

const DEFAULT_GUID = '00000000-0000-0000-0000-000000000000';

export class UtilityHelper {
    static clone<T = any>(obj: T) {
        return deepmerge<T>({}, obj);
    }

    static createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;

            return v.toString(16);
        });
    }

    static equals(x: any, y: any) {
        if (x === y) {
            return true;
        } else if (typeof x == 'object' && x != null && typeof y == 'object' && y != null) {
            if (Object.keys(x).length != Object.keys(y).length) return false;

            for (var prop in x) {
                if (y.hasOwnProperty(prop)) {
                    if (UtilityHelper.notEquals(x[prop], y[prop])) return false;
                } else return false;
            }

            return true;
        } else return false;
    }

    static notEquals(x: any, y: any) {
        return !UtilityHelper.equals(x, y);
    }

    static flatten(arr: any[]) {
        if (this.isArray(arr)) {
            let index: number;

            while ((index = arr.findIndex(el => Array.isArray(el))) > -1) {
                arr.splice(index, 1, ...arr[index]);
            }
        }

        return arr;
    }

    static getDotNotationPropertyValue<T = any>(value: any, dotNotationProperty: string) {
        if (value) {
            const splittedDotNotationProperty = dotNotationProperty.split('.');

            while (splittedDotNotationProperty.length && value) {
                value = value[splittedDotNotationProperty.shift() as string];
            }
        }

        return value as T;
    }

    static getDotNotationPropertyLast(dotNotationProperty: string) {
        if (UtilityHelper.isNotEmpty(dotNotationProperty)) {
            const splittedDotNotationProperty = dotNotationProperty.split('.');

            return splittedDotNotationProperty[splittedDotNotationProperty.length - 1];
        }

        return '';
    }

    static setDotNotationPropertyValue(value: any, dotNotationProperty: string, changeValueFunc: (existingValue: any) => any) {
        if (value && dotNotationProperty) {
            let copiedValue = value;
            let originvalValue = copiedValue;
            const splittedDotNotationProperty = dotNotationProperty.split('.');

            do {
                const currentProperty = splittedDotNotationProperty.shift()!;

                if (splittedDotNotationProperty.length) {
                    if (copiedValue[currentProperty]) {
                        copiedValue = copiedValue[currentProperty];
                    }
                    else {
                        copiedValue = copiedValue[currentProperty] = {};
                    }
                }
                else {
                    copiedValue[currentProperty] = changeValueFunc(copiedValue[currentProperty]);
                }
            }
            while (splittedDotNotationProperty.length && value)

            return originvalValue;
        }

        return value;
    }

    static isArray(array: any) {
        return Array.isArray(array) || array instanceof Array;
    }

    static isBoolean(value: any) {
        return typeof value === typeof true;
    }

    static isClass<T>(value: any, constructor: IConstructor<T>) {
        return value instanceof constructor;
    }

    static isDefined(value: any) {
        return !this.isUndefined(value);
    }

    static isError(value: any) {
        return value instanceof Error;
    }

    static isEmpty(val: any): boolean {
        // Null and Undefined...
        if (UtilityHelper.isUndefinedOrNull(val)) {
            return true;
        }

        // Booleans..., Numbers...
        if (UtilityHelper.isBoolean(val) || UtilityHelper.isNumber(val)) {
            return false;
        }

        // Strings...
        if (UtilityHelper.isString(val)) {
            return val.length === 0 || val === ' ' || val === DEFAULT_GUID;
        }

        // Functions...
        if (UtilityHelper.isFunction(val)) {
            return val.length === 0;
        }

        // Arrays...
        if (UtilityHelper.isArray(val)) {
            return val.length === 0 || (val as any[]).every(q => UtilityHelper.isEmpty(q));
        }

        // Errors...
        if (val instanceof Error) {
            return val.message === '';
        }

        // Objects...
        if (val.toString == toString) {
            switch (val.toString()) {
                // Maps, Sets, Files and Errors...
                case '[object File]':
                case '[object Map]':
                case '[object Set]': {
                    return val.size === 0;
                }

                // Plain objects...
                case '[object Object]': {
                    for (var key in val) {
                        if (Object.prototype.hasOwnProperty.call(val, key)) {
                            return false;
                        }
                    }

                    return true;
                }
            }
        }

        // Anything else...
        return false;
    }

    static isNotEmpty(obj: any) {
        return !UtilityHelper.isEmpty(obj);
    }

    static isIterableArray(value: any) {
        if (value == null || this.isUndefined(value)) {
            return false;
        }

        if (typeof value[Symbol.iterator] !== 'function') {
            return false;
        }

        return !this.isString(value);
    }

    static isNumber(value: any) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    static isFunction(value: any) {
        return typeof value === 'function';
    }

    static isObject(value: any) {
        return value !== null && typeof value === 'object';
    }

    static isString(value: any) {
        return typeof value === 'string';
    }

    static isUndefined(value: any) {
        return typeof value === 'undefined';
    }

    static isUndefinedOrNull(value: any) {
        return UtilityHelper.isUndefined(value) || value == null;
    }

    static isPropertyInObject(property: any, value: Object) {
        if (this.isObject(value)) {
            return value.hasOwnProperty(property);
        }

        return false;
    }
}
