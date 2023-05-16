import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const config = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

export const client = new S3Client(config);

export const getAssetFullPath = (path) =>
  `https://${process.env.S3_ASSET_BUCKET}.s3.amazonaws.com/${path}`;

export const generatePresignedUrl = async (fileKey) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_ASSET_BUCKET,
    Key: fileKey,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 60 });

  return url;
};