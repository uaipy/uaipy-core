import { Context, Handler, SQSEvent } from "aws-lambda";
import { makeProcessReportController } from "src/infra/factories/presentation/queue/message";

export const handler: Handler = async (event: SQSEvent, context: Context) => {
    const controller = makeProcessReportController();
    return controller.handle(event, context);
}