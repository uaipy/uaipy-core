import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from 'aws-lambda';
import {makeListAllUserController  } from 'src/main/factories/application/http/user';
import { functionHttpAdapter } from 'src/main/adapters/function';
      
const controller = makeListAllUserController();
export const handler: Handler = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResult> => {
  return functionHttpAdapter(controller)(event, context);
};
      