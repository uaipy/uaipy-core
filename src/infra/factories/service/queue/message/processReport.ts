import { ProcessReportUseCase } from "../../../../../service/queue/message/processReport";
import { makeMessageDataSource, makeUserDataSource } from "../../../data/dataSources";
import { makePresignedURL, makeResendClient, makeS3MPUManager } from "../../../data/clients";

import Environment from "../../../../../utils/environment";


export const makeProcessReportUseCase = (): ProcessReportUseCase => {
    const environment = Environment.getValues();
    return new ProcessReportUseCase(
        makeMessageDataSource(), 
        makeUserDataSource(), 
        makeS3MPUManager(environment.REPORTS_BUCKET_NAME), 
        makePresignedURL(environment.REPORTS_BUCKET_NAME), 
        makeResendClient()
    );
}