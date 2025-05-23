import { MessageRepository } from 'src/domain/contracts/repository/pgsql';
import {PGMessageRepository} from 'src/infrastructure/repository/pgsql';
import { makeSQLDatabaseWrapper } from './wrapper';

export const makeMessageRepository = (): MessageRepository => {
  return new PGMessageRepository(makeSQLDatabaseWrapper());
};
