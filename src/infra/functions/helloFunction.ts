import Environment from "../../utils/environment";
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";

console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(event, context);
  const time = new Date();
  console.log("server side time: ", time);
  console.log(
    "Brazil time",
    time.toLocaleString("pt-br", { timeZone: "America/Sao_Paulo" })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      stage: Environment.getValues().NODE_ENV,
      message: "Hello, UAIpy World!",
      good_news: "UAIpy is on AWS",
    }),
  };
};
