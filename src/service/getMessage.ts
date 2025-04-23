import Message from "../domain/model/message";
import { CheckDeviceExistence } from "../domain/interfaces/useCases/device";
import { MessageDataSource } from "../data/interfaces/dataSources/messageDataSource";

import {
  GetMessage,
  GetMessageInput,
  GetMessageOutput,
} from "../domain/interfaces/useCases/message";

export default class GetMessageUseCase implements GetMessage {
  constructor(
    private readonly repository: MessageDataSource,
    private readonly deviceValidationService: CheckDeviceExistence
  ) {}
  async execute(params: GetMessageInput): Promise<GetMessageOutput[]> {
    console.log("CREATE MESSAGE SERVICE");
    const device = await this.deviceValidationService.checkByIntegrationCode(
      params.deviceIntegrationCode
    );
    console.log(device);
    const createdMessage = await this.repository.getByDeviceId(device.getId());
    console.log(createdMessage);
    return createdMessage.map(
      (message) =>
        ({
          id: message.getId(),
          data: message.getData(),
          localReadingDate: message.getLocalReadingDate(),
        } as unknown as GetMessageOutput)
    );
  }
}
