import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import Environment from "../utils/environment";
import {
  AuthenticateUser,
  AuthenticateUserInput,
} from "../domain/interfaces/useCases/userAuth";
import Controller from "../domain/interfaces/controller";
import { HttpResponse } from "../domain/interfaces/http";
import HttpHandler from "../utils/http";
import ErrorCode from "../utils/errors/error";

export default class AuthenticateUserController implements Controller {
  constructor(private readonly service: AuthenticateUser) {}

  async handler(
    event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<HttpResponse> {
    try {
      const requestData: AuthenticateUserInput = this.validateRequest(
        JSON.parse(event.body || "")
      );

      const response = await this.service.execute(requestData);

      return HttpHandler.created({
        stage: Environment.getValues().NODE_ENV,
        success: response.success,
        token: response.token,
      });
    } catch (err: any) {
      console.error(err);
      return HttpHandler.handleError(err);
    }
  }

  private validateRequest(requestData: any): AuthenticateUserInput {
    const isValidRequest = requestData.email && requestData.password;
    if (!isValidRequest) {
      throw ErrorCode.INVALID_REQUEST;
    }
    return {
      email: requestData.email,
      password: requestData.password,
    };
  }
}
