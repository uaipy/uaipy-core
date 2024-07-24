import HttpHandler from "../../utils/http";
import Environment from "../../utils/environment";
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import Token from "../../domain/model/token";

console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const requestData: any = JSON.parse(event.body || "");
    const token = Token.verify(requestData.token);
    return HttpHandler.ok({
      stage: Environment.getValues().NODE_ENV,
      token,
    });
  } catch (err: any) {
    console.error(err);
    return HttpHandler.handleError(err);
  }
};
