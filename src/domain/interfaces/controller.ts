import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

export default interface Controller {
  handler(
    event: APIGatewayProxyEventV2,
    context: Context
  ): Promise<APIGatewayProxyResult>;
}
