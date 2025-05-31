import PGOrquestratorDataSource from "src/data/dataSources/pgOrquestratorDataSource";
import { makeSQLDatabaseWrapper } from "./dataSourceFactory";

export const makeOrquestratorDataSource = (): PGOrquestratorDataSource => {
    return new PGOrquestratorDataSource(makeSQLDatabaseWrapper());
};