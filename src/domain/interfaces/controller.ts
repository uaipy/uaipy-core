import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { HttpResponse } from "./http";

export default interface Controller {
  handler(
    event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<HttpResponse> 
}
