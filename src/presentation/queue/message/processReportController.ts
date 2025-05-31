import {
    SQSEvent,
  } from "aws-lambda";
  import {
    ProcessReportQueue,
  } from "../../../domain/interfaces/useCases";
import { TriggerController } from "src/domain/interfaces/trigger/controller";

type MessageType = {
    deviceId: number;
    userEmail: string;
}

type Model = Error | void

export class ProcessReportController extends TriggerController<Model> {
    constructor(private readonly service: ProcessReportQueue) {
        super();
    }

    async perform(event: SQSEvent): Promise<Model> {
        try {
        const { Records } = event;
        for (const record of Records) {
            const message = JSON.parse(record.body) as MessageType;
            await this.service.execute(message.deviceId, message.userEmail);
            }
        } catch (error) {
            throw error;
        }
    }
}
  