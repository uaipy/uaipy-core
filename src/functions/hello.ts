// import Environment from "@utils/environment";
// import { APIGatewayProxyEventV2, APIGatewayProxyResult, APIGatewayProxyStructuredResultV2, Context, Handler } from "aws-lambda";

// console.log("Create New Lambda")

// export const handler: Handler = async (
//   event: APIGatewayProxyEventV2,
//   context: Context
// ): Promise<APIGatewayProxyResult> => {
//     console.log(event, context)
//     const newDate = new Date()
//     console.log(newDate);
//     console.log(newDate.toLocaleString('pt-br', {timeZone: 'America/Sao_Paulo'}));

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         stage: Environment.getValues().NODE_ENV,
//         message: 'Hello, UAIpy World!',
//         good_news: 'UAIpy is on AWS',
//       }),
//     };
//   };