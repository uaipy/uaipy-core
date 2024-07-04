import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  APIGatewayProxyStructuredResultV2,
  Context,
  Handler,
} from "aws-lambda";
import { Pool } from "pg";
import Environment from "../../../utils/environment";
import PGUserDataSource from "../../../data/dataSources/pgUserDataSource";
import CreateUserUseCase from "../../../service/createUser";
import CreateUserController from "../../../presentation/createUserController";

const db = new Pool({
  user: Environment.getValues().DB_USER,
  host: Environment.getValues().DB_HOST,
  database: Environment.getValues().DB_NAME,
  password: Environment.getValues().DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
const repository = new PGUserDataSource(db);
const service = new CreateUserUseCase(repository);
const controller = new CreateUserController(service);
console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return controller.handler(event, context)
};
