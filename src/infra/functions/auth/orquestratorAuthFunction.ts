import {
    APIGatewayProxyEventV2,
    APIGatewayProxyResult,
    Context,
    Handler,
} from "aws-lambda";

import AuthenticateOrquestratorController from "../../../presentation/authenticateOrquestratorController";
import { makeOrquestratorDataSource, makeUserDataSource } from "../../factories/data/dataSources"
import CheckUserExistenceUseCase from "../../../service/checkUserExistence";
import CheckOrquestratorExistenceUseCase from "../../../service/checkOrquestrator";
import AuthenticateOrquestratorUseCase from "../../../service/authenticateOrquestrator";

const userRepository = makeUserDataSource();
const orquestratorRepository = makeOrquestratorDataSource();
const userService = new CheckUserExistenceUseCase(userRepository);
const orquestratorService = new CheckOrquestratorExistenceUseCase(orquestratorRepository);
const service = new AuthenticateOrquestratorUseCase(userService, orquestratorService);
const controller = new AuthenticateOrquestratorController(service);

console.log("Orquestrator Auth Lambda");

export const handler: Handler = async (
    event: APIGatewayProxyEventV2,
    context: Context
): Promise<APIGatewayProxyResult> => {
    return controller.handler(event, context);
};


