export type EmptyVoidFunction = () => void;
export type KeyValueObject = { [key: string]: any };

export interface IKeyValuePair<TKey = any, TValue = any> {
    key: TKey;
    value: TValue;
}