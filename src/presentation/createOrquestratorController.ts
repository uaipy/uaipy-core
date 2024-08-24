import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import Environment from "../utils/environment";
import {
  CreateOrquestrator,
  CreateOrquestratorInput,
} from "../domain/interfaces/useCases/orquestrator";
import Controller from "../domain/interfaces/controller";
import { HttpResponse } from "../domain/interfaces/http";
import HttpHandler from "../utils/http";
import ErrorCode from "../utils/errors/error";
import UserPrivateController from "./privateController";

export default class CreateOrquestratorController
  extends UserPrivateController
  implements Controller
{
  constructor(private readonly service: CreateOrquestrator) {
    super();
  }

  async handler(
    event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<HttpResponse> {
    try {
      const authData = this.validateAuthToken(
        event.headers.Authorization || ""
      );
      const requestData: CreateOrquestratorInput = this.validateRequest(
        JSON.parse(event.body || ""),
        authData.userUuid
      );
      const orquestrator = await this.service.execute(requestData);
      return HttpHandler.created({
        stage: Environment.getValues().NODE_ENV,
        orquestrator,
      });
    } catch (err: any) {
      console.error(err);
      return HttpHandler.handleError(err);
    }
  }

  private validateRequest(
    requestData: any,
    userUuid: string
  ): CreateOrquestratorInput {
    const isValidRequest = requestData.name && requestData.description;
    if (!isValidRequest) {
      throw ErrorCode.INVALID_REQUEST;
    }
    return {
      name: requestData.name,
      userUuid,
      description: requestData.description,
    };
  }
}
