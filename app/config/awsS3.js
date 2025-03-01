const AWS = require('aws-sdk');
const config = require('./initEnv');

// Configure AWS SDK
AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.bucketRegion,
});

const s3 = new AWS.S3();

module.exports = s3;