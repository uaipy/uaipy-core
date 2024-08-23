import ErrorCode from "./../utils/errors/error";
import Token, { TokenPayload } from "../domain/model/token";

export default class UserPrivateController {
  constructor() {}
  protected validateAuthToken(authToken: string): TokenPayload {
    if (!authToken) {
      throw ErrorCode.ACCESS_TOKEN_NOT_FOUND;
    }
    return Token.verify(authToken);
  }
}
