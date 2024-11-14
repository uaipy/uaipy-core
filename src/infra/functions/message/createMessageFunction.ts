import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import { makeSQLDatabaseWrapper } from "../../factories/dataSourceFactory";
import PGMessageDataSource from "../../../data/dataSources/pgMessageDataSource";
import CreateMessageUseCase from "../../../service/createMessage";
import CreateMessageController from "../../../presentation/createMessageController";
import CheckDeviceExistenceUseCase from "../../../service/checkDeviceExistence";
import PGDeviceDataSource from "../../../data/dataSources/pgDeviceDataSource";

const db = makeSQLDatabaseWrapper();
const repository = new PGMessageDataSource(db);
const deviceRepository = new PGDeviceDataSource(db);
const deviceService = new CheckDeviceExistenceUseCase(deviceRepository);
const service = new CreateMessageUseCase(repository, deviceService);
const controller = new CreateMessageController(service);
console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return controller.handler(event, context);
};
