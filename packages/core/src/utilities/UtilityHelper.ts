import { IConstructor } from './generics';

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

    static isArray(array: any) {
        return Array.isArray(array) || array instanceof Array;
    }

    static isBoolean(value: any) {
        return typeof(value) === typeof(true);
    }

    static isClass<T>(value: any, constructor: IConstructor<T>) {
        return this.isObject(value);
    }

    static isDefined(value: any) {
        return !this.isUndefined(value);
    }

    static isError(value: any) {
        return value instanceof Error;
    }

    static isEmpty(obj: any) {
        if (obj) {
            if (!this.isObject(obj) || !this.isArray(obj)) {
                return false;
            }

            if (this.isArray(obj) && (obj as any[]).length > 0) {
                return false;
            }

            let key;

            for (key in obj) {
                if (this.isArray(obj) || obj.hasOwnProperty(key)) {
                    return false;
                }
            }
        }
        else if (this.isNumber(obj)) {
            return false;
        }

        return true;
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
