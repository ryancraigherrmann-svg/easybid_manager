import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import path from 'path';

let _s3: S3Client | null = null;
function getS3(): S3Client {
  if (!_s3) {
    const region = process.env.AWS_REGION || 'us-east-1';
    console.log(`[S3] Initializing client — region=${region}, bucket=${getBucket()}`);
    _s3 = new S3Client({ region });
  }
  return _s3;
}
function getBucket(): string {
  return process.env.S3_BUCKET || 'easybid-uploads-production';
}

/**
 * Upload a file buffer to S3 and return the object key + a presigned download URL.
 */
export async function uploadFile(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
): Promise<{ key: string; name: string; url: string }> {
  const ext = path.extname(originalName);
  const key = `uploads/${randomUUID()}${ext}`;

  await getS3().send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    }),
  );

  const url = await getDownloadUrl(key);
  return { key, name: originalName, url };
}

/**
 * Generate a time-limited presigned URL for downloading a file from S3.
 * @param key    S3 object key
 * @param expiresIn  URL lifetime in seconds (default 1 hour)
 */
export async function getDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({ Bucket: getBucket(), Key: key });
  return getSignedUrl(getS3(), command, { expiresIn });
}

/**
 * Delete a file from S3.
 */
export async function deleteFile(key: string): Promise<void> {
  await getS3().send(new DeleteObjectCommand({ Bucket: getBucket(), Key: key }));
}
