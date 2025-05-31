import { MessageInputType } from "src/domain/model/message";
export interface PersistMessageQueue {
  execute(message: {orquestratorId: number, data: MessageInputType}): Promise<void>;
}

export interface ProcessReportQueue {
  execute(deviceId: number, userEmail: string): Promise<void>;
}


