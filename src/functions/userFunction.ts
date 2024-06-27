import { APIGatewayProxyEventV2, APIGatewayProxyResult, APIGatewayProxyStructuredResultV2, Context, Handler } from "aws-lambda";
import { Pool } from "pg";
import Environment from "src/utils/environment";


console.log("Create New Lambda")

export const userHandler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResult> => {
    console.log(event, context)
    try {
      const db = new Pool({
        user: Environment.getValues().DB_USER,
        host: Environment.getValues().DB_HOST,
        database: Environment.getValues().DB_NAME,
        password: Environment.getValues().DB_PASSWORD,
        port: 5432,
        ssl: {
          rejectUnauthorized: false
        }
      });
      // const repository = new PGUserDataSource(db);
      const users = {} //await repository.getAll()
      return {
        statusCode: 200,
        body: JSON.stringify({
          stage: Environment.getValues().NODE_ENV,
          users,
        }),
      };
    } catch(err){
      console.error(err)
      return {
        statusCode: 500,
        body: JSON.stringify({
          stage: Environment.getValues().NODE_ENV,
          message: "Internal Server Error",
        }),
      };
    }
  };