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
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event, context)
    const token = Token.verify(event.headers.Authorization || '');
    return HttpHandler.ok({
      stage: Environment.getValues().NODE_ENV,
      token,
    });
  } catch (err: any) {
    console.error(err);
    return HttpHandler.handleError(err);
  }
};
