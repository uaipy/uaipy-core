import  * as env  from "env-var";
import { EnvironmentValues } from "src/domain/interfaces/environment";

export default class Environment {

    constructor(){}

    static getValues = (): EnvironmentValues => {
        return {
            NODE_ENV:  env.get("NODE_ENV").asString() || '',
            DB_USER: env.get("DB_USER").asString() || '',
            DB_HOST: env.get("DB_HOST").asString() || '',
            DB_NAME: env.get("DB_NAME").asString() || '',
            DB_PASSWORD: env.get("DB_PASSWORD").asString() || '',
        }
    };
}