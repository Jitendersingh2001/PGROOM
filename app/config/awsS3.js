const { S3Client } = require("@aws-sdk/client-s3");
const config = require("./initEnv");

// Initialize S3 client
const s3 = new S3Client({
  region: config.aws.bucketRegion,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

module.exports = s3;
