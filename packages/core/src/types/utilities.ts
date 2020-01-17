export type EmptyVoidFunction = () => void;
export type KeyValueObject<T = any> = { [key: string]: T };

export interface IKeyValuePair<TKey = any, TValue = any> {
    key: TKey;
    value: TValue;
}
