import jwt, { SignOptions } from 'jsonwebtoken';
import Environment from 'src/main/config/enviroment';
import { ForbiddenError} from './errors';

export default class Token {
  constructor() {}

  static signUser(payload: UserTokenPayload): string {
    const options: SignOptions = {
      expiresIn: Environment.token.userExpiration,
    };
    return jwt.sign(payload, Environment.token.secret, options);
  }

  static verifyUser(token: string): UserTokenPayload {
    try {
      const decoded = jwt.verify(
        token,
        Environment.token.secret
      ) as UserTokenPayload;
      return decoded;
    } catch (error: any) {
      throw new ForbiddenError('AUTH-001: Access refused. You don\'t have permission to access the requested resource.');
    }
  }

  static signOrquestrator(payload: OrquestratorTokenPayload): string {
    const options: SignOptions = {
      expiresIn: Environment.token.orquestratorExpiration,
    };
    return jwt.sign(payload, Environment.token.secret, options);
  }

  static verifyOrquestrator(token: string): OrquestratorTokenPayload {
    try {
      const decoded = jwt.verify(
        token,
        Environment.token.secret
      ) as OrquestratorTokenPayload;
      return decoded;
    } catch (error: any) {
      console.error('Token verification failed:', error);
      throw new ForbiddenError('AUTH-001: Access refused. You don\'t have permission to access the requested resource.');
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
