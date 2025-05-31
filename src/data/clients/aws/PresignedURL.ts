import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class PresignedURL {

    constructor(
        private readonly client: S3Client,
        private readonly bucket: string,
    ) { }
    async get(fileKey: string) {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: fileKey
        })

        const twentyFourHoursInSeconds = 60 * 60 * 24

        const url = await getSignedUrl(this.client, command, {
            expiresIn: twentyFourHoursInSeconds
        })

        return url
    }
}