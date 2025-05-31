import { PersistMessageUseCase } from "../../../../../service/queue/message/persistMessage";
import { makeDeviceDataSource, makeMessageDataSource } from "../../../data/dataSources";

export const makePersistMessageUseCase = (): PersistMessageUseCase => {
    return new PersistMessageUseCase(
        makeDeviceDataSource(), 
        makeMessageDataSource()
    );
}