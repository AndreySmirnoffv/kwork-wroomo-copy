import { S3Client } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_KEY as string
    }
})

export const BUCKET_NAME = process.env.S3_BUCKET_NAME as string