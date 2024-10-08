import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import Environment from "../utils/environment";
import {
  CreateUser,
  CreateUserInput,
} from "../domain/interfaces/useCases/user";
import Controller from "../domain/interfaces/controller";
import { HttpResponse } from "../domain/interfaces/http";
import HttpHandler from "../utils/http";
import ErrorCode from "../utils/errors/error";

export default class CreateUserController
  implements Controller
{
  constructor(private readonly service: CreateUser) {
  }

  async handler(
    event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<HttpResponse> {
    try {
      const requestData: CreateUserInput = this.validateRequest(
        JSON.parse(event.body || "")
      );

      const user = await this.service.execute(requestData);

      return HttpHandler.created({
        stage: Environment.getValues().NODE_ENV,
        user,
      });
    } catch (err: any) {
      console.error(err);
      return HttpHandler.handleError(err);
    }
  }

  private validateRequest(requestData: any): CreateUserInput {
    const isValidRequest =
      requestData.name && requestData.email && requestData.password;
    if (!isValidRequest) {
      throw ErrorCode.INVALID_REQUEST;
    }
    return {
      name: requestData.name,
      email: requestData.email,
      password: requestData.password,
      details: JSON.stringify(requestData.details),
    };
  }
}
