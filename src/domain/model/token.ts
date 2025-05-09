import jwt, { SignOptions } from "jsonwebtoken";
import Environment from "../../utils/environment";
import ErrorCode from "../../utils/errors/error";

export default class Token {
  constructor() {}

  static signUser(payload: UserTokenPayload): string {
    const environment = Environment.getValues();
    const options: SignOptions = {
      expiresIn: environment.USER_TOKEN_EXPIRATION,
    };
    return jwt.sign(payload, environment.TOKEN_SECRET_KEY, options);
  }

  static verifyUser(token: string): UserTokenPayload {
    try {
      const decoded = jwt.verify(
        token,
        Environment.getValues().TOKEN_SECRET_KEY
      ) as UserTokenPayload;
      return decoded;
    } catch (error: any) {
      console.error("Token verification failed:", error);
      throw ErrorCode.INVALID_ACCESS_TOKEN;
    }
  }

  static signOrquestrator(payload: OrquestratorTokenPayload): string {
    const environment = Environment.getValues();
    const options: SignOptions = {
      expiresIn: environment.ORQUESTRATOR_TOKEN_EXPIRATION,
    };
    return jwt.sign(payload, environment.TOKEN_SECRET_KEY, options);
  }

  static verifyOrquestrator(token: string): OrquestratorTokenPayload {
    try {
      const decoded = jwt.verify(
        token,
        Environment.getValues().TOKEN_SECRET_KEY
      ) as OrquestratorTokenPayload;
      return decoded;
    } catch (error: any) {
      console.error("Token verification failed:", error);
      throw ErrorCode.INVALID_ACCESS_TOKEN;
    }
  }
}

export interface UserTokenPayload {
  userUuid: string;
  email: string;
}

export interface OrquestratorTokenPayload {
  orquestratorUuid: string;
  userUuid: string;
}
