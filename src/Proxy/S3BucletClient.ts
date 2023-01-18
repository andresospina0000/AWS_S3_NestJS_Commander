import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";

export class S3BucketClient {

    async getS3File(bucket: string) {

        try {
            const s3Client = new S3Client(
                {
                    credentials: fromEnv(),
                    region: 'bucket-region',
                }
            );

            const params = {
                Bucket: bucket,
                Key: process.env.FILE_KEY,
            }

            const command = new GetObjectCommand(params);
            const response = await s3Client.send(command);
            
            return response.Body;
        } catch (error) {
            console.log(error)
        }
    }
}
