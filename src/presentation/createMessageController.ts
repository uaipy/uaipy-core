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
      const requestData = JSON.parse(event.body || "");

      if (Array.isArray(requestData)) {

        const validatedRequests: CreateMessageInput[] = requestData.map((data) => this.validateRequest(data));

        validatedRequests.sort(
          (a, b) =>
            new Date(a.localReadingDate).getTime() -
            new Date(b.localReadingDate).getTime()
        );

        for (const validatedData of validatedRequests) {
          await this.service.execute(validatedData);
        }

        return HttpHandler.created({
          stage: Environment.getValues().NODE_ENV,
          message: "Messages processed successfully",
        });
      } else {
        const validatedRequest: CreateMessageInput =
          this.validateRequest(requestData);
        console.log("CREATE MESSAGE");
        const message = await this.service.execute(validatedRequest);
        return HttpHandler.created({
          stage: Environment.getValues().NODE_ENV,
          message,
        });
      }
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
