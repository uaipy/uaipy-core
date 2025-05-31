import PGDeviceDataSource from "src/data/dataSources/pgDeviceDataSource";
import { makeSQLDatabaseWrapper } from "./dataSourceFactory";

export const makeDeviceDataSource = (): PGDeviceDataSource => {
    return new PGDeviceDataSource(makeSQLDatabaseWrapper());
};
  