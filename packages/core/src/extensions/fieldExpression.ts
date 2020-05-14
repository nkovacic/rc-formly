import { Logger } from '../services';

export function evalStringExpression(expression: string, argNames: string[]) {
    try {
        // eslint-disable-next-line no-new-func
        return Function(...argNames, `return ${expression};`) as any;
    } catch (error) {
        Logger.error(error);
    }
}

export function evalExpressionValueSetter(expression: string, argNames: string[]) {
    try {
        // eslint-disable-next-line no-new-func
        return Function(...argNames, `${expression} = expressionValue;`) as (value: any) => void;
    } catch (error) {
        Logger.error(error);
    }
}

export function evalExpression(expression: string | Function | boolean, thisArg: any, argVal: any[]): any {
    if (expression instanceof Function) {
        return expression.apply(thisArg, argVal);
    }

    return expression ? true : false;
}
