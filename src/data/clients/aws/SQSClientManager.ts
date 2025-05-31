import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

export class SQSClientManager {
    constructor(
        private readonly client: SQSClient,
        private readonly queueUrl: string
    ) {}
    async sendMessage(message: string): Promise<void> {
       const command = new SendMessageCommand({
        MessageBody: message,
        QueueUrl: this.queueUrl,    
       })

       await this.client.send(command);
    }
}