import { EnvironmentType } from './EnvironmentType';

export class Environment {
    private static environmentType: EnvironmentType = EnvironmentType.production;

    public static isDevelopment() {
        return Environment.environmentType === EnvironmentType.development;
    }

    public static isStaging() {
        return Environment.environmentType === EnvironmentType.staging;
    }

    public static isProduction() {
        return Environment.environmentType === EnvironmentType.production;
    }
}