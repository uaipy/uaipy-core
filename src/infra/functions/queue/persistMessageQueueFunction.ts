import { Context, Handler, SQSEvent } from "aws-lambda";
import { makePersistMessageController } from "src/infra/factories/presentation/queue/message";

export const handler: Handler = async (event: SQSEvent, context: Context) => {
    const controller = makePersistMessageController();
    return controller.handle(event, context);
}