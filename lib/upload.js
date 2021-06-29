import { config, S3 } from 'aws-sdk';

// Set the region (other credentials are in process.env)
config.update({ region: 'us-east-2' });

// Create S3 service object
const s3 = new S3({ apiVersion: '2006-03-01' });

const upload = async (bucket, fileName, body) => {
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: bucket,
        Key: fileName,
        Body: body,
        ACL: 'public-read',
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      },
    );
  });
};

export default upload;
