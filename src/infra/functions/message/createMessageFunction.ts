import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import { makeSQLDatabaseWrapper } from "../../factories/dataSourceFactory";
import PGMessageDataSource from "../../../data/dataSources/pgMessageDataSource";
const db = makeSQLDatabaseWrapper();
const repository = new PGMessageDataSource(db);
const service = new CreateMessageUseCase(repository);
const controller = new CreateMessageController(service);
console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return controller.handler(event, context);
};
