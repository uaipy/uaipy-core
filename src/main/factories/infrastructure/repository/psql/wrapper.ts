import { SQLDatabaseWrapper } from 'src/domain/contracts/repository/pgsql';
import Environment from 'src/main/config/enviroment';
import { Pool } from 'pg';

export const makeSQLDatabaseWrapper =  (): SQLDatabaseWrapper => {
  return new Pool({
    user: Environment.database.user,
    host: Environment.database.host,
    database: Environment.database.name,
    password: Environment.database.password,
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};