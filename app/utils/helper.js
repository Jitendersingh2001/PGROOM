const jwt = require("jsonwebtoken");
const config = require("../config/initEnv");
const s3 = require("../config/awsS3");
const constant = require("../constant/constant");
const http = require("../constant/statusCodes");

class helper {
  sendError = (res, message, statusCode) => {
    const response = {
      message: message,
      statusCode: statusCode ?? http.UNPROCESSABLE_ENTITY,
    };
    return res.json(response);
  };

  generateToken = (userId, roleId) => {
    // Define the payload with userId and roleId
    const payload = {
      userId,
      roleId,
    };

    // Secret key for signing the JWT
    const secretKey = config.jwt.jwt_secret_key;

    // Generate the JWT
    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    return token;
  };

  // Example of an async function
  uploadFileToS3 = async (fileBuffer, fileName, fileType, folderName) => {
    try {
      // Define S3 upload parameters
      const params = {
        Bucket: constant.S3_BUCKET_NAME,
        Key: `${folderName}/${fileName}`,
        Body: fileBuffer,
        ContentType: fileType,
      };

      // Upload the file to S3
      const uploadedFile = await s3.upload(params).promise();

      // Return the file Name
      return uploadedFile.Key;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error; // Re-throw the error for further handling
    }
  };

  getFileFromS3 = async (fileName, expiresIn) => {
    try {
      // Define S3 get parameters
      const params = {
        Bucket: constant.S3_BUCKET_NAME,
        Key: fileName,
        Expires: expiresIn,
      };

      // Get the file from S3
      return await s3.getSignedUrlPromise('getObject', params);
    } catch (error) {
      console.error("Error getting file from S3:", error);
      throw error;
    }
  };
}
module.exports = new helper();