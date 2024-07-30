import { Pool } from "pg";
import Environment from "../../utils/environment";
import { SQLDatabaseWrapper } from "src/data/interfaces/sqlDatabaseWrapper";

export const makeSQLDatabaseWrapper =  (): SQLDatabaseWrapper => {
    return new Pool({
        user: Environment.getValues().DB_USER,
        host: Environment.getValues().DB_HOST,
        database: Environment.getValues().DB_NAME,
        password: Environment.getValues().DB_PASSWORD,
        port: 5432,
        ssl: {
          rejectUnauthorized: false,
        },
      });
  };
  