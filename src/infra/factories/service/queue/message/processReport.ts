import { ProcessReportUseCase } from "../../../../../service/queue/message/processReport";
import { makeMessageDataSource, makeUserDataSource } from "../../../data/dataSources";
import { makePresignedURL, makeResendClient, makeS3MPUManager } from "../../../data/clients";

export const makeProcessReportUseCase = (): ProcessReportUseCase => {
    return new ProcessReportUseCase(
        makeMessageDataSource(), 
        makeUserDataSource(), 
        makeS3MPUManager(''), 
        makePresignedURL(''), 
        makeResendClient()
    );
}