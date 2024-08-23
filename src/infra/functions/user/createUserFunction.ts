import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  APIGatewayProxyStructuredResultV2,
  Context,
  Handler,
} from "aws-lambda";

import PGUserDataSource from "../../../data/dataSources/pgUserDataSource";
import CreateUserUseCase from "../../../service/createUser";
import CreateUserController from "../../../presentation/createUserController";
import { makeSQLDatabaseWrapper } from "../../../infra/factories/dataSourceFactory";

const db = makeSQLDatabaseWrapper();
const repository = new PGUserDataSource(db);
const service = new CreateUserUseCase(repository);
const controller = new CreateUserController(service);
console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return controller.handler(event, context);
};
