import PGUserDataSource from "src/data/dataSources/pgUserDataSource";
import { makeSQLDatabaseWrapper } from "./dataSourceFactory";

export const makeUserDataSource = (): PGUserDataSource => {
    return new PGUserDataSource(makeSQLDatabaseWrapper());
};      