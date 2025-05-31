import { Handler, APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { makeSQSClientManager } from "src/infra/factories/data/clients/aws/SQSClientManager";
import Environment from "src/utils/environment";
import HttpHandler from "src/utils/http";

type GenerateReportMessageInput = {
    deviceId: number;
    userEmail: string;
}
const sqsClientManager = makeSQSClientManager(Environment.getValues().SQS_REPORT_MESSAGE_QUEUE_URL);
export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
    const { deviceId, userEmail }: GenerateReportMessageInput = JSON.parse(event.body || '{}');
    await sqsClientManager.sendMessage(JSON.stringify({ deviceId, userEmail }));
    return HttpHandler.ok({ message: 'Em breve você receberá um e-mail com o relatório' });
}
