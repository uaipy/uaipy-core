import Message, { MessageInputType } from "src/domain/model/message";
import { PersistMessageQueue } from "../../../domain/interfaces/useCases";
import { DeviceDataSource, MessageDataSource } from "../../../data/interfaces/dataSources";
import ErrorCode from "src/utils/errors/error";

export class PersistMessageUseCase implements PersistMessageQueue {
    constructor(
        private readonly deviceRepository: DeviceDataSource,
        private readonly messageRepository: MessageDataSource
    ) { }
    async execute(message: { orquestratorId: number, data: MessageInputType }): Promise<void> {
        const { orquestratorId, data } = message;

        try {
            for (const deviceData of data.data) {
                const device = await this.deviceRepository.getById(deviceData.deviceId);

                if (!device.getId()) {
                    throw ErrorCode.DEVICE_NOT_FOUND_BY_INTEGRATION_CODE;
                }

                for (const messageData of deviceData.messages) {
                    const message = Message.create(
                        orquestratorId,
                        {
                            data: [
                                {
                                    deviceId: device.getId(),
                                    messages: [messageData]
                                }
                            ]
                        },
                        new Date(),
                        new Date(),
                        true
                    );
                    await this.messageRepository.create(message);
                }
            }
        } catch (error) {
            throw ErrorCode.MESSAGE_PERSIST_QUEUE_ERROR;
        }
    }
}
