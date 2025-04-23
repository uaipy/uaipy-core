import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import { makeSQLDatabaseWrapper } from "../../factories/dataSourceFactory";
import PGMessageDataSource from "../../../data/dataSources/pgMessageDataSource";
import GetMessageController from "../../../presentation/getMessageController";
import GetMessageUseCase from "../../../service/getMessage";
import PGDeviceDataSource from "../../../data/dataSources/pgDeviceDataSource";
import CheckDeviceExistenceUseCase from "../../../service/checkDeviceExistence";

const db = makeSQLDatabaseWrapper();
const repository = new PGMessageDataSource(db);
const deviceRepository = new PGDeviceDataSource(db);
const deviceService = new CheckDeviceExistenceUseCase(deviceRepository);
const service = new GetMessageUseCase(repository, deviceService);

const controller = new GetMessageController(service);
console.log("Create New Lambda");

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return controller.handler(event, context);
};
