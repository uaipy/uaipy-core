import {PresignedURL} from "../../../../../data/clients"
import { S3Client } from "@aws-sdk/client-s3";

export const makePresignedURL = (bucketName: string): PresignedURL => {
    return new PresignedURL(new S3Client(), bucketName);
}