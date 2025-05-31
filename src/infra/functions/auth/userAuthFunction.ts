import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";

import AuthenticateUseCase from "../../../service/authenticateUser";
import AuthenticateUserController from "../../../presentation/authenticateUserController";
import { makeUserDataSource } from "../../factories/data/dataSources";
import CheckUserExistenceUseCase from "../../../service/checkUserExistence";

const repository = makeUserDataSource();
const userService = new CheckUserExistenceUseCase(repository);
const service = new AuthenticateUseCase(userService);
const controller = new AuthenticateUserController(service);
console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return controller.handler(event, context);
};
