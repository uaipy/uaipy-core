import { OrquestratorRepository } from 'src/domain/contracts/repository/pgsql';
import { PGOrquestratorRepository } from 'src/infrastructure/repository/pgsql';
import { makeSQLDatabaseWrapper } from './wrapper';

export const makeOrquestratorRepository = (): OrquestratorRepository => {
  return new PGOrquestratorRepository(makeSQLDatabaseWrapper());
};
