import Message from "../domain/model/message";
import { CheckDeviceExistence } from "../domain/interfaces/useCases/device";
import { MessageDataSource } from "../data/interfaces/dataSources/messageDataSource";

import {
  CreateMessage,
  CreateMessageInput,
  CreateMessageOutput,
} from "../domain/interfaces/useCases/message";

export default class CreateMessageUseCase implements CreateMessage {
  constructor(
    private readonly repository: MessageDataSource,
    private readonly deviceValidationService: CheckDeviceExistence
  ) {}
  async execute(params: CreateMessageInput): Promise<CreateMessageOutput> {
    const device = await this.deviceValidationService.checkByIntegrationCode(
      params.deviceIntegrationCode
    );
    console.log(device);
    const createdMessage = await this.createMessage(params, device.getId());
    console.log(createdMessage);
    return {
      id: createdMessage.getId(),
      data: createdMessage.getData(),
      localReadingDate: createdMessage.getLocalReadingDate(),
    };
  }

  private async createMessage(
    params: CreateMessageInput,
    deviceId: number
  ): Promise<Message> {
    const message = Message.create(
      deviceId,
      params.data,
      params.localReadingDate,
      true
    );
    return this.repository.create(message);
  }
}
