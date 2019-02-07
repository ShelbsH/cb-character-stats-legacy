import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import uuid from 'uuid/v4';

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_DEFAULT_REGION
});

let s3 = new S3({
  apiVersion: '2006-03-01',
  params: { Bucket: process.env.AWS_BUCKET_NAME }
});

export const addAvatar = async (filename, stream, fileType) => {

  /**
   * TODO: Add unique key id, create folder directory
   * e.g. character/name/avatar
   */

  return await s3
    .upload({
      Key: `avatar/${uuid()}-${filename}`,
      Body: stream,
      Bucket: 'cb-character-stats',
      ACL: 'public-read',
      ContentType: fileType
    })
    .promise();
};
