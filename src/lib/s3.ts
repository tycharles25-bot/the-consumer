import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from './env';

export function getS3() {
  if (!env.aws.bucket) {
    console.warn('AWS_S3_BUCKET not set, using dummy credentials');
  }
  return new S3Client({
    region: env.aws.region || 'us-east-1',
    credentials: env.aws.accessKeyId && env.aws.secretAccessKey ? {
      accessKeyId: env.aws.accessKeyId,
      secretAccessKey: env.aws.secretAccessKey,
    } : {
      accessKeyId: 'dummy',
      secretAccessKey: 'dummy',
    },
  });
}

export async function createPresignedUploadKey(key: string, contentType: string) {
  try {
    const s3 = getS3();
    const bucket = env.aws.bucket || 'dummy-bucket';
    const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });
    return { url, key };
  } catch (error) {
    console.error('S3 presign error:', error);
    throw new Error('Failed to create upload URL. Please configure AWS credentials.');
  }
}



