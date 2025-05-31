import PGMessageDataSource from "src/data/dataSources/pgMessageDataSource";
import { makeSQLDatabaseWrapper } from "./dataSourceFactory";

export const makeMessageDataSource = (): PGMessageDataSource => {
    return new PGMessageDataSource(makeSQLDatabaseWrapper());
};