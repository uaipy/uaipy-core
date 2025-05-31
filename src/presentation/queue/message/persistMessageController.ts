import {
    SQSEvent,
  } from "aws-lambda";
  import {
    PersistMessageQueue,
  } from "../../../domain/interfaces/useCases";
import { TriggerController } from "src/domain/interfaces/trigger/controller";
import { MessageInputType } from "src/domain/model/message";

type MessageType = {
    orquestratorId: number;
    data: MessageInputType;
}

type Model = Error | void

export class PersistMessageController extends TriggerController<Model> {
    constructor(private readonly service: PersistMessageQueue) {
        super();
    }

    async perform(event: SQSEvent): Promise<Model> {
        try {
        const { Records } = event;
        for (const record of Records) {
            const message = JSON.parse(record.body) as MessageType;
            await this.service.execute({
                orquestratorId: message.orquestratorId,
                data: message.data
                });
            }
        } catch (error) {
            throw error;
        }
    }
}
  