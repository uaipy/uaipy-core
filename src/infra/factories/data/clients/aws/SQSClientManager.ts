import { SQSClient } from "@aws-sdk/client-sqs";
import {SQSClientManager} from "../../../../../data/clients"

export const makeSQSClientManager = (queueUrl: string): SQSClientManager => {
    return new SQSClientManager(new SQSClient(), queueUrl);
}