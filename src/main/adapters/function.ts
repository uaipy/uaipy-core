import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { Controller } from 'src/application/controllers/http/controller';
import { Response } from 'src/application/helpers';

export const statusCodeMap = {
  'ok': 200,
  'created': 201,
  'badRequest': 400,
  'unauthorized': 401,
  'notFound': 404,
  'conflict': 409,
  'forbidden': 403,
  'internalServerError': 500,
};

export const functionHttpAdapter = (controller: Controller) => {
  return async (event: APIGatewayProxyEventV2, context: Context): Promise<Response> => {
    const httpRequest = {
      body: event.body ? JSON.parse(event.body) : null,
      pathParameters: event.pathParameters,
      queryStringParameters: event.queryStringParameters,
      headers: event.headers,
    };
    const httpResponse = await controller.handle(httpRequest, context);
    return {
      statusCode: httpResponse.statusCode,
      body: httpResponse.body,
      headers: httpResponse.headers,
    };
  };
};