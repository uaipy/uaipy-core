import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import PGOrquestratorDataSource from "../../../data/dataSources/pgOrquestratorDataSource";
import CreateOrquestratorUseCase from "../../../service/createOrquestrator";
import CreateOrquestratorController from "../../../presentation/createOrquestratorController";
import { makeSQLDatabaseWrapper } from "../../../infra/factories/dataSourceFactory";
import PGUserDataSource from "../../../data/dataSources/pgUserDataSource";
import CheckUserExistenceUseCase from "../../../service/checkUserExistence";

const db = makeSQLDatabaseWrapper();
const repository = new PGOrquestratorDataSource(db);
const userRepository = new PGUserDataSource(db);
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
