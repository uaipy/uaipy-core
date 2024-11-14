import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import Environment from "../utils/environment";
import {
  CreateMessage,
  CreateMessageInput,
} from "../domain/interfaces/useCases/message";
import Controller from "../domain/interfaces/controller";
import { HttpResponse } from "../domain/interfaces/http";
import HttpHandler from "../utils/http";
import ErrorCode from "../utils/errors/error";
import OrquestratorPrivateController from "./orquestratorPrivateController";

export default class CreateMessageController
  extends OrquestratorPrivateController
  implements Controller
{
  constructor(private readonly service: CreateMessage) {
    super();
  }

  async handler(
    event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<HttpResponse> {
    try {
      // const authData = this.validateAuthToken(
      //   event.headers.Authorization || ""
      // );
      const requestData: CreateMessageInput = this.validateRequest(
        JSON.parse(event.body || "")
      );
      console.log("CREATE MESSAGE");
      const message = await this.service.execute(requestData);
      return HttpHandler.created({
        stage: Environment.getValues().NODE_ENV,
        message,
      });
    } catch (err: any) {
      console.error(err);
      return HttpHandler.handleError(err);
    }
  }

  private validateRequest(requestData: any): CreateMessageInput {
    const isValidRequest =
      requestData.integrationCode ||
      requestData.data ||
      requestData.messageReadDate;
    if (!isValidRequest) {
      throw ErrorCode.INVALID_REQUEST;
    }
    return {
      deviceIntegrationCode: requestData.integrationCode,
      data: requestData.data,
      localReadingDate: requestData.messageReadDate,
    };
  }
}
