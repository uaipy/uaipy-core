import  * as env  from "env-var";

export default class Environment {
    private nodeEnv: string;

    constructor(){
        this.nodeEnv = env.get("NODE_ENV").asString() || '';
    }
    getNodeEnv = (): string => {
        return this.nodeEnv
    };
}