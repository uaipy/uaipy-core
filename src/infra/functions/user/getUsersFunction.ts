import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import Environment from "../../../utils/environment";
import PGUserDataSource from "../../../data/dataSources/pgUserDataSource";
import { makeSQLDatabaseWrapper } from "../../../infra/factories/dataSourceFactory";

const db = makeSQLDatabaseWrapper();
const repository = new PGUserDataSource(db);
console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event, context);
    const users = await repository.getAll();
    return {
      statusCode: 200,
      body: JSON.stringify({
        stage: Environment.getValues().NODE_ENV,
        users,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  }
};
