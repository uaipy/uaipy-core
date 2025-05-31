import { Handler, APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { MessageInputType } from "src/domain/model/message";
import { makeSQSClientManager } from "src/infra/factories/data/clients/aws/SQSClientManager";
import Environment from "src/utils/environment";
import HttpHandler from "src/utils/http";

type PersistMessageInput = {
    orquestratorId: number;
    data: MessageInputType
}

const sqsClientManager = makeSQSClientManager(Environment.getValues().SQS_PERSIST_MESSAGE_QUEUE_URL);

export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
    const { orquestratorId, data }: PersistMessageInput = JSON.parse(event.body || '{}');

    await sqsClientManager.sendMessage(JSON.stringify({
        orquestratorId,
        data
    }));

    return HttpHandler.ok({
            message: 'As mensagens foram enviadas para a fila de persistência'
        });
}
