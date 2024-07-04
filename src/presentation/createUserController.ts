import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import Environment from "../utils/environment";
import User from "../domain/model/user";
import CreateUser from "../domain/interfaces/useCases/user";
import Controller from "../domain/interfaces/controller";

export default class CreateUserController implements Controller {
  constructor(private readonly service: CreateUser) {}

  async handler(
    event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<APIGatewayProxyResult> {
    try {
      const requestData: any = JSON.parse(event.body || "");
      const user = await this.service.execute({
        name: requestData.name,
        email: requestData.email,
        password: requestData.password,
        details: JSON.stringify(requestData.details),
      });
      return {
        statusCode: 201,
        body: JSON.stringify({
          stage: Environment.getValues().NODE_ENV,
          user,
        }),
      };
    } catch (err: any) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Internal Server Error",
        }),
      };
    }
  }
}
