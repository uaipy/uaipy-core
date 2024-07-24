import { ErrorType } from "../../domain/enums/errorType";
import { BaseError } from "./baseError";

export default class ErrorCode {
  constructor() {}
  static INVALID_ACCESS_TOKEN: Error = new BaseError(
    ErrorType.FORBIDDEN,
    "AUTH-001",
    "Access Denied: Invalid Access Token"
  );

  static ACCESS_TOKEN_NOT_FOUND: Error = new BaseError(
    ErrorType.UNAUTHRORIZED,
    "AUTH-002",
    "Access Denied: Authorization Token Not Found"
  );

  static INTERNAL_SERVER_ERROR: Error = new BaseError(
    ErrorType.INTERNAL,
    "INTERNAL-SERVER-ERROR",
    "Unexpected thig happen"
  );

  static INVALID_EMAIL(email: string): Error {
    return new BaseError(
      ErrorType.BUSINESS,
      "INVALID-REQUEST-001",
      `Email ${email} is invalid`
    );
  }
}
