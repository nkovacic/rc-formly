interface IKeyAlreadyExistsError extends Error { }

// tslint:disable-next-line:variable-name
export const KeyAlreadyExistsError = function (this: Error, keyName: string, objectName?: string) {
    this.name = 'KeyAlreadyExistsError';
    this.message = `Key with name ${keyName} already exists`;

    if (objectName) {
        this.message += ` in object ${objectName}`;
    }

    this.message += '!';

    this.stack = (new Error()).stack;
} as any as { new(key: string, objectName?: string): IKeyAlreadyExistsError }

KeyAlreadyExistsError.prototype = Object.create(Error.prototype);
KeyAlreadyExistsError.prototype.constructor = KeyAlreadyExistsError;