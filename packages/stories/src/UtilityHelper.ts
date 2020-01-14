const DEFAULT_GUID = '00000000-0000-0000-0000-000000000000';

export class UtilityHelper {
    static equals(...objects: any[]) {
        if (!objects || objects.length < 1) {
            return false;
        }

        let leftChain: any[];
        let rightChain: any[];

        for (let i = 1, l = objects.length; i < l; i += 1) {
            leftChain = [];
            rightChain = [];

            if (!this.deepEquals(arguments[0], arguments[i], leftChain, rightChain)) {
                return false;
            }
        }

        return true;
    }

    static flatten(arr: any[]) {
        if (this.isArray(arr)) {
            let index: number;

            while ((index = arr.findIndex(el => Array.isArray(el))) > -1) {
                arr.splice(index, 1, ...arr[index]);
            }
        }

        return arr;
    }

    static getDotNotationPropertyValue(value: any, dotNotationProperty: string) {
        if (value) {
            const splittedDotNotationProperty = dotNotationProperty.split('.');

            while (splittedDotNotationProperty.length && value) {
                value = value[splittedDotNotationProperty.shift() as string];
            }
        }

        return value;
    }

    static getDotNotationPropertyFirst(dotNotationProperty: string) {
        if (UtilityHelper.isNotEmpty(dotNotationProperty)) {
            const splittedDotNotationProperty = dotNotationProperty.split('.');

            return splittedDotNotationProperty[0];
        }

        return '';
    }

    static getDotNotationPropertyLast(dotNotationProperty: string) {
        if (UtilityHelper.isNotEmpty(dotNotationProperty)) {
            const splittedDotNotationProperty = dotNotationProperty.split('.');

            return splittedDotNotationProperty[splittedDotNotationProperty.length - 1];
        }

        return '';
    }

    static isArray(array: any) {
        return Array.isArray(array) || array instanceof Array;
    }

    static isBoolean(value: any) {
        return typeof(value) === typeof(true);
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
            return val.message === "";
        }

        // Objects...
        if (val.toString == toString) {
            switch (val.toString()) {
                // Maps, Sets, Files and Errors...
                case "[object File]":
                case "[object Map]":
                case "[object Set]": {
                    return val.size === 0;
                }

                // Plain objects...
                case "[object Object]": {
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
        return typeof(value) === 'function';
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

    private static deepEquals(x: any, y: any, leftChain: any[], rightChain: any[]) {
        let p;

        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        if (x === y) {
            return true;
        }

        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }

            if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }

            if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof (x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!this.deepEquals(x[p], y[p], leftChain, rightChain)) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }
}
