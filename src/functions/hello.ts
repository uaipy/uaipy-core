import { APIGatewayProxyEventV2, APIGatewayProxyResult, APIGatewayProxyStructuredResultV2, Context, Handler } from "aws-lambda";
import Environment from "../utils/environment";

console.log("Create New Lambda")

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
    console.log(event, context)
    return {
      statusCode: 200,
      body: JSON.stringify({
        stage: new Environment().getNodeEnv(),
        message: 'Hello, UAIpy World!',
        good_news: 'UAIpy is on AWS',
      }),
    };
  };