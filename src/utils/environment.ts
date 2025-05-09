import  * as env  from "env-var";
import { EnvironmentValues } from "../../src/domain/interfaces/environment";

export default class Environment {

    constructor(){}

    static getValues = (): EnvironmentValues => {
        return {
            NODE_ENV:  env.get("NODE_ENV").asString() || '',
            DB_USER: env.get("DB_USER").asString() || '',
            DB_HOST: env.get("DB_HOST").asString() || '',
            DB_NAME: env.get("DB_NAME").asString() || '',
            DB_PASSWORD: env.get("DB_PASSWORD").asString() || '',
            PASSWORD_SALT: env.get("PASSWORD_SALT").asIntPositive() || 0,
            TOKEN_SECRET_KEY: env.get("TOKEN_SECRET_KEY").asString() || '',
            USER_TOKEN_EXPIRATION: env.get("USER_TOKEN_EXPIRATION").asIntPositive() || 3600,
            ORQUESTRATOR_TOKEN_EXPIRATION: env.get("ORQUESTRATOR_TOKEN_EXPIRATION").asIntPositive() || 3600
        }
    };
}