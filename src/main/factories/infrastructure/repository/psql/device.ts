import { DeviceRepository } from 'src/domain/contracts/repository/pgsql';
import { PGDeviceRepository } from 'src/infrastructure/repository/pgsql';
import { makeSQLDatabaseWrapper } from './wrapper';

export const makeDeviceRepository = (): DeviceRepository => {
  return new PGDeviceRepository(makeSQLDatabaseWrapper());
};
