import { S3MPUManager, PresignedURL } from "src/data/clients/aws";
import { ResendClient } from "src/data/clients/mail/resend";
import { MessageDataSource, UserDataSource } from "src/data/interfaces/dataSources";
import { ProcessReportQueue } from "src/domain/interfaces/useCases";
import { v4 as uuidv4 } from 'uuid';
import { mbToBytes } from "src/utils/mbToBytes";
import ErrorCode from "src/utils/errors/error";

export class ProcessReportUseCase implements ProcessReportQueue {
    constructor(
        private readonly messageRepository: MessageDataSource,
        private readonly userRepository: UserDataSource,
        private readonly s3MPUManager: S3MPUManager,
        private readonly presignedURL: PresignedURL,
        private readonly resend: ResendClient
    ) { }
    async execute(deviceId: number, userEmail: string): Promise<void> {
        const user = await this.userRepository.getByUuid(userEmail);

        if (!user) {
            throw ErrorCode.USER_NOT_FOUND_BY_EMAIL;
        }

        const fileKey = `${new Date().toISOString()}-${uuidv4()}.csv`;
        const messages = await this.messageRepository.getByDeviceId(deviceId);
        if (messages.length === 0) {
            throw ErrorCode.MESSAGE_NOT_FOUND_BY_DEVICE_ID;
        }
        await this.s3MPUManager.start(fileKey);
        const minChunkSize = mbToBytes(6)
        try {
            const header = 'ORQUESTRATOR_ID,DEVICE_ID,TEMPERATURE,HUMIDITY,LOCAL_READING_DATE,RAIN\n';
            let currentChunk = header;

            for (const message of messages) {
                const data = message.getData().data[0];
                const deviceId = message.getData().data[0].deviceId;
                const orquestratorId = message.getOrquestratorId();

                currentChunk += data.messages.map(message => 
                    `${orquestratorId},${deviceId},${message.temperature},${message.humidity},${message.localReadingDate},${message.rain}`
                ).join('\n');
                const currentChunkSize = Buffer.byteLength(currentChunk, 'utf-8');
                if ( currentChunkSize + minChunkSize) {
                    continue
                }
                await this.s3MPUManager.uploadPart(Buffer.from(currentChunk, 'utf-8'), fileKey);
                currentChunk = '';
                if (currentChunk) {
                    await this.s3MPUManager.uploadPart(Buffer.from(currentChunk, 'utf-8'), fileKey);
                }

                await this.s3MPUManager.complete(fileKey);
            }

        } catch {
           await this.s3MPUManager.abort(fileKey);
        }

        const presignedUrl = await this.presignedURL.get(fileKey);

        await this.resend.sendEmail({
            from: 'no-reply@uaipy.com.br',
            to: [user.getEmail()],
            subject: 'O seu relatório já está pronto!',
            text: `Aqui está o seu relatório (a URL é válido por apenas 24h): ${presignedUrl}`,
            html: `
              <h1 style="font-size:32px;font-weight:bold;">Seu relatório ficou pronto!</h1>
              <br />
              Clique <a href="${presignedUrl}">aqui</a> para baixar ou acesse a URL: ${presignedUrl}.
              <br /><br />
              <small>Este link é válido por apenas 24 horas.</small>
            `,
          });
    }
}