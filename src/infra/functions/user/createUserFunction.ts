import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import CreateUserUseCase from "../../../service/createUser";
import CreateUserController from "../../../presentation/createUserController";
import { makeUserDataSource } from "../../factories/data/dataSources";

const service = new CreateUserUseCase(makeUserDataSource());
const controller = new CreateUserController(service);
console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return controller.handler(event, context);
};
