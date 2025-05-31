import {S3MPUManager} from "../../../../../data/clients"
import { S3Client } from "@aws-sdk/client-s3";

export const makeS3MPUManager = (bucketName: string): S3MPUManager => {
    return new S3MPUManager(bucketName, new S3Client());
}