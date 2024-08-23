import ErrorCode from "./../utils/errors/error";
import Token, { UserTokenPayload } from "../domain/model/token";

export default class UserPrivateController {
  constructor() {}
  protected validateAuthToken(authToken: string): UserTokenPayload {
    if (!authToken) {
      throw ErrorCode.ACCESS_TOKEN_NOT_FOUND;
    }
    return Token.verifyUser(authToken);
  }
}
