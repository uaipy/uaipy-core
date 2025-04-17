import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import Environment from "../utils/environment";
import {
  AuthenticateOrquestrator,
  AuthenticateOrquestratorInput,
} from "../domain/interfaces/useCases";
import Controller from "../domain/interfaces/controller";
import { HttpResponse } from "../domain/interfaces/http";
import HttpHandler from "../utils/http";
import ErrorCode from "../utils/errors/error";

export default class AuthenticateOrquestratorController implements Controller {
  constructor(private readonly service: AuthenticateOrquestrator) {}

  async handler(
    event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<HttpResponse> {
    try {
      const requestData: AuthenticateOrquestratorInput = this.validateRequest(
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

  private validateRequest(requestData: any): AuthenticateOrquestratorInput {
    const isValidRequest = requestData.userUuid && requestData.orquestratorUuid;
    if (!isValidRequest) {
      throw ErrorCode.INVALID_REQUEST;
    }
    return {
      userUuid: requestData.userUuid,
      orquestratorUuid: requestData.orquestratorUuid,
    };
  }
}
