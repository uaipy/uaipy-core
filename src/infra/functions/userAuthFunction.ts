import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";

import PGUserDataSource from "../../data/dataSources/pgUserDataSource";
import AuthenticateUseCase from "../../service/authenticateUser";
import AuthenticateController from "../../presentation/authenticateUserController";
import { makeSQLDatabaseWrapper } from "../factories/dataSourceFactory";
import CheckUserExistenceUseCase from "../../service/checkUserExistence";

const db = makeSQLDatabaseWrapper();
const repository = new PGUserDataSource(db);
const userService = new CheckUserExistenceUseCase(repository);
const service = new AuthenticateUseCase(userService);
const controller = new AuthenticateController(service);
console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return controller.handler(event, context);
};
