import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import Environment from "../utils/environment";
import {
  GetMessage,
  GetMessageInput,
  GetMessageOutput,
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
      const messages = await this.service.execute(requestData);
      return HttpHandler.ok(
        this.convertReadingsToBrasiliaTime(this.sortByDate(messages))
      );
    } catch (err: any) {
      console.error(err);
      return HttpHandler.handleError(err);
    }
  }

  private sortByDate(entries: GetMessageOutput[]): GetMessageOutput[] {
    return entries.sort((a, b) => {
      return (
        new Date(a.localReadingDate).getTime() -
        new Date(b.localReadingDate).getTime()
      );
    });
  }

  private convertReadingsToBrasiliaTime(
    readings: GetMessageOutput[]
  ): GetMessageOutput[] {
    return readings.map((reading) => {
      const date = new Date(reading.localReadingDate);

      const brasiliaDate = new Date(
        date.toLocaleString("en-US", {
          timeZone: "America/Sao_Paulo",
        })
      );

      return {
        id: reading.id,
        data: reading.data,
        localReadingDate: brasiliaDate,
      };
    });
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
