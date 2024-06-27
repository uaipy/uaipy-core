import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  APIGatewayProxyStructuredResultV2,
  Context,
  Handler,
} from "aws-lambda";
import { Pool } from "pg";
import Environment from "../utils/environment";
import PGUserDataSource from "../data/dataSource/pgUserDataSource";
import User from "../domain/model/user";

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
console.log("Create New Lambda");

export const getUserHandler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event, context);
    const users = await repository.getAll();
    return {
      statusCode: 200,
      body: JSON.stringify({
        stage: Environment.getValues().NODE_ENV,
        users,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  }
};

export const createUserHandler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event, context);
    const requestData: any = JSON.parse(event.body || '')
    const user = await repository.create(
      User.create(
        requestData.name,
        requestData.email,
        requestData.password,
        JSON.stringify(requestData.details),
        false
      )
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        stage: Environment.getValues().NODE_ENV,
        user,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  }
};
