import { ErrorType } from "../../domain/enums/errorType";
import { BaseError } from "./baseError";

export default class ErrorCode {
  constructor() {}
  static INVALID_ACCESS_TOKEN: Error = new BaseError(
    ErrorType.FORBIDDEN,
    "AUTH-001",
    "Access refused. You don't have permission to access the requested resource."
  );

  static ACCESS_TOKEN_NOT_FOUND: Error = new BaseError(
    ErrorType.UNAUTHRORIZED,
    "AUTH-002",
    "Invalid Access Token. Verify your request and try again."
  );

  static GENERIC_ERROR: Error = new BaseError(
    ErrorType.INTERNAL,
    "INTERNAL-SERVER-ERROR",
    "An Unexpected Error Happened. Please try again later."
  );

  static INVALID_REQUEST: Error = new BaseError(
    ErrorType.BUSINESS,
    "INVALID-REQUEST-001",
    `One property is missing on request payload`
  );

  static INVALID_EMAIL(email: string): Error {
    return new BaseError(
      ErrorType.BUSINESS,
      "INVALID-REQUEST-002",
      `Email ${email} is invalid`
    );
  }

  static INVALID_PASSWORD: Error = new BaseError(
    ErrorType.BUSINESS,
    "INVALID-REQUEST-003",
    `Invalid Password`
  );

  static USER_NOT_FOUND_BY_EMAIL: Error = new BaseError(
    ErrorType.BUSINESS,
    "USER-NOT-FOUND-001",
    `the specified user email provided was not found`
  );

  static USER_NOT_FOUND_BY_UUID: Error = new BaseError(
    ErrorType.BUSINESS,
    "USER-NOT-FOUND-002",
    `the specified user uuid provided was not found`
  );

  static USER_NOT_FOUND_BY_ID: Error = new BaseError(
    ErrorType.BUSINESS,
    "USER-NOT-FOUND-003",
    `the specified user ID provided was not found`
  );

  static ORQUESTRATOR_NOT_FOUND_BY_UUID: Error = new BaseError(
    ErrorType.BUSINESS,
    "ORQUESTRATOR-NOT-FOUND-004",
    `the specified orqueestrator uuid provided was not found`
  );
}
