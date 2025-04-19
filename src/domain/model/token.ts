import jwt, { SignOptions } from "jsonwebtoken";
import Environment from "../../utils/environment";
import ErrorCode from "../../utils/errors/error";

export default class Token {
  constructor() {}

  static sign(payload: UserTokenPayload): string {
    const environment = Environment.getValues();
    const options: SignOptions = {
      expiresIn: environment.TOKEN_EXPIRATION || 3600,
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
      expiresIn: environment.TOKEN_EXPIRATION,
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
  userUuid: string;
  orquestratorUuid: string;
}
