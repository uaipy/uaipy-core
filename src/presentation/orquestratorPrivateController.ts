import ErrorCode from "../utils/errors/error";
import Token, { OrquestratorTokenPayload } from "../domain/model/token";

export default class OrquestratorPrivateController {
  constructor() {}
  protected validateAuthToken(authToken: string): OrquestratorTokenPayload {
    if (!authToken) {
      throw ErrorCode.ACCESS_TOKEN_NOT_FOUND;
    }
    return Token.verifyOrquestrator(authToken);
  }
}