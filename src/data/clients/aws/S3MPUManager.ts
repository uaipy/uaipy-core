import { AbortMultipartUploadCommand, CompletedPart, CompleteMultipartUploadCommand, CreateMultipartUploadCommand, S3Client, UploadPartCommand } from "@aws-sdk/client-s3";

export class S3MPUManager {
    private uploadId: string | undefined;
    private partNumber: number = 1;
    private uploadParts: CompletedPart[] = [];
    
    constructor(
        private readonly bucketName: string,
        private readonly client: S3Client
    ) {}

    async start(fileKey: string): Promise<void> {
        const command = new CreateMultipartUploadCommand({
            Bucket: this.bucketName,
            Key: fileKey,
        })
    
        const {UploadId} = await this.client.send(command)
        if (!UploadId) {
            throw new Error("Failed to create multipart upload")
        }
        this.uploadId = UploadId
    }
    
    async uploadPart(body: Buffer, fileKey: string): Promise<void> {
        const command = new UploadPartCommand({
            Bucket: this.bucketName,
            Key: fileKey,
            UploadId: this.uploadId,
            PartNumber: this.partNumber,
            Body: body
        })
        const { ETag } = await this.client.send(command)
    
        this.uploadParts.push({
            PartNumber: this.partNumber,
            ETag: ETag
        })
        this.partNumber++
    
    }
    
    async complete(fileKey: string): Promise<void> {
        const command = new CompleteMultipartUploadCommand({
            Bucket: this.bucketName,
            Key: fileKey,
            UploadId: this.uploadId,
            MultipartUpload: {
                Parts: this.uploadParts
            }   
        })
        await this.client.send(command)
    }
    
    async abort(fileKey: string): Promise<void> {
        const command = new AbortMultipartUploadCommand({
            Bucket: this.bucketName,
            Key: fileKey,
            UploadId: this.uploadId
        })
        await this.client.send(command)
    }
}


