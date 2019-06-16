import { UtilityHelper } from 'app/utilities';
import { Environment } from 'app/environment';

enum LogLevel {
    debug = 'debug',
    error = 'error',
    info = 'info',
    log = 'log',
    warn = 'warn'
}

export class Logger {
    private static printToConsole(message: string, logLevel: LogLevel, ...optionalParams: any[]) {
        if (Environment.isDevelopment()) {
            if (UtilityHelper.isEmpty(optionalParams)) {
                console[logLevel](message);
            }
            else {
                console[logLevel](message, optionalParams);
            }
        }
    }

    static debug(message: string, ...optionalParams: any[]) {
        this.printToConsole(message, LogLevel.debug, optionalParams);
    }

    static error(err: Error, message?: string) {
        let messageText = message;

        if (err && err.message) {
            messageText = err.message;
        }

        this.printToConsole(messageText!, LogLevel.error, [err]);
    }

    static info(message: string, ...optionalParams: any[]) {
        this.printToConsole(message, LogLevel.info, optionalParams);
    }

    static log(message: string, ...optionalParams: any[]) {
        this.printToConsole(message, LogLevel.log, optionalParams);
    }

    static warn(message: string, ...optionalParams: any[]) {
        this.printToConsole(message, LogLevel.warn, optionalParams);
    }
}
