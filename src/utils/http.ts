import { HttpResponse } from "./../domain/interfaces/http";
import { defaultHeaders } from "./constants";
import { StatusCode } from "./../domain/enums/statusCode";
import { ErrorType } from "./../domain/enums/errorType";
import { BaseError } from "./errors/baseError";

export default class HttpHandler {
  constructor() {}

  static ok(body?: any): HttpResponse {
    const response = {
      headers: defaultHeaders(""),
      statusCode: StatusCode.OK,
      body: JSON.stringify(body || {}),
    };
    return response;
  }

  static created(body?: any): HttpResponse {
    const response = {
      headers: defaultHeaders(""),
      statusCode: StatusCode.CREATED,
      body: JSON.stringify(body || {}),
    };
    return response;
  }

  static handleError(error: BaseError): HttpResponse {
    const statusCode: Record<ErrorType, StatusCode> = {
      BUSINESS_ERROR: StatusCode.BAD_REQUEST,
      INTERNAL_ERROR: StatusCode.INTERNAL_SERVER_ERROR,
      UNAUTHRORIZED_ERROR: StatusCode.UNAUTHRORIZED,
      FORBIDDEN_ERROR: StatusCode.FORBIDDEN,
    };

    return {
      statusCode: statusCode[error.type] || StatusCode.INTERNAL_SERVER_ERROR,
      headers: defaultHeaders(""),
      body: JSON.stringify({
        error: error.type,
        code: error.code,
        description: error.message,
      }),
    };
  }
}
