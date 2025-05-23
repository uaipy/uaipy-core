import { UserRepository } from 'src/domain/contracts/repository/pgsql';
import { PGUserRepository } from 'src/infrastructure/repository/pgsql';
import { makeSQLDatabaseWrapper } from './wrapper';

export const makeUserRepository = (): UserRepository => {
  return new PGUserRepository(makeSQLDatabaseWrapper());
};
