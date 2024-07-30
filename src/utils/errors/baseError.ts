import { ErrorType } from "./../../domain/enums/errorType";

export class BaseError extends Error {
  public type: ErrorType;
  public code: string;
  constructor(type: ErrorType, code: string, description?: string) {
    super(description);
    this.code = code;
    this.type = type;
  }
}
