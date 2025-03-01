const config = require('../config/initEnv');
const constant = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    SUPER_ADMIN_ROLE_ID : 1,
    ADMIN_ROLE_ID: 2,
    USER_ROLE_ID: 3,
    TRUE: "true",
    FALSE: "false",
    S3_BUCKET_NAME: config.aws.bucketName,
};

module.exports = constant;
