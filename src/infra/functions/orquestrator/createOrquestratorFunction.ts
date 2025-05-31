import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import CreateOrquestratorUseCase from "../../../service/createOrquestrator";
import CreateOrquestratorController from "../../../presentation/createOrquestratorController";
import { makeOrquestratorDataSource, makeUserDataSource } from "../../factories/data/dataSources";
import CheckUserExistenceUseCase from "../../../service/checkUserExistence";

const repository = makeOrquestratorDataSource();
const userRepository = makeUserDataSource();
const userService = new CheckUserExistenceUseCase(userRepository);
const service = new CreateOrquestratorUseCase(repository, userService);
const controller = new CreateOrquestratorController(service);
console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return controller.handler(event, context);
};
