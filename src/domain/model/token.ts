import jwt, { SignOptions } from "jsonwebtoken";
import Environment from "../../utils/environment";
import ErrorCode from "../../utils/errors/error";

export default class Token {
  constructor() {}

  static sign(payload: TokenPayload): string {
    const environment = Environment.getValues();
    const options: SignOptions = {
      expiresIn: environment.TOKEN_EXPIRATION,
    };
    return jwt.sign(payload, environment.TOKEN_SECRET_KEY, options);
  }

  static verify(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(
        token,
        Environment.getValues().TOKEN_SECRET_KEY
      ) as TokenPayload;
      return decoded;
    } catch (error: any) {
      console.error("Token verification failed:", error);
      throw ErrorCode.INVALID_ACCESS_TOKEN;
    }
  }
}

export interface TokenPayload {
  userId: string;
  email: string;
}
