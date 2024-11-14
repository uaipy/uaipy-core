import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import Environment from "../utils/environment";
import {
  GetMessage,
  GetMessageInput,
} from "../domain/interfaces/useCases/message";
import Controller from "../domain/interfaces/controller";
import { HttpResponse } from "../domain/interfaces/http";
import HttpHandler from "../utils/http";
import ErrorCode from "../utils/errors/error";

export default class GetMessageController implements Controller {
  constructor(private readonly service: GetMessage) {}

  async handler(
    event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<HttpResponse> {
    try {
      console.log(event.queryStringParameters);
      const requestData: GetMessageInput = this.validateRequest(
        event.queryStringParameters
      );
      console.log("GET MESSAGE");
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

  private validateRequest(requestData: any): GetMessageInput {
    const isValidRequest = requestData.integrationCode || undefined;
    if (!isValidRequest) {
      throw ErrorCode.INVALID_REQUEST;
    }
    return {
      deviceIntegrationCode: requestData.integrationCode,
    };
  }
}
