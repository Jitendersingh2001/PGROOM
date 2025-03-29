const jwt = require("jsonwebtoken");
const config = require("../config/initEnv");
const s3 = require("../config/awsS3");
const constant = require("../constant/constant");
const http = require("../constant/statusCodes");
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand,ListObjectsV2Command,DeleteObjectsCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

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

      // Upload the file using PutObjectCommand
      await s3.send(new PutObjectCommand(params));
      // Return the file Name
      return `${folderName}/${fileName}`;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error; // Re-throw the error for further handling
    }
  };

  getFileFromS3 = async (fileName, expiresIn) => {
    try {
      const command = new GetObjectCommand({
        Bucket: constant.S3_BUCKET_NAME,
        Key: fileName,
      });

      return await getSignedUrl(s3, command, { expiresIn });
    } catch (error) {
      console.error("Error getting file from S3:", error);
      throw error;
    }
  };

  deleteFileFromS3 = async (fileName) => {
    try {
      // Define S3 delete parameters
      const params = {
        Bucket: constant.S3_BUCKET_NAME,
        Key: fileName,
      };

      // Create and send delete command
      const command = new DeleteObjectCommand(params);
      await s3.send(command);

      return { success: true, message: "File deleted successfully" };
    } catch (error) {
      console.error("Error deleting file from S3:", error);
      throw error;
    }
  };

  deleteFolderFromS3 = async (folderPath) => {
    try {
      // First, list all objects in the folder
      const listParams = {
        Bucket: constant.S3_BUCKET_NAME,
        Prefix: folderPath, // Should end with '/' if it's a folder path
      };

      const listCommand = new ListObjectsV2Command(listParams);
      const listedObjects = await s3.send(listCommand);

      // If no objects found, return success
      if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
        return { success: true, message: "Folder is empty or doesn't exist" };
      }

      // Prepare objects for deletion
      const deleteParams = {
        Bucket: constant.S3_BUCKET_NAME,
        Delete: {
          Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
          Quiet: false, // Set to true to reduce response verbosity
        },
      };

      // Delete all objects
      const deleteCommand = new DeleteObjectsCommand(deleteParams);
      await s3.send(deleteCommand);

      // Handle pagination if more than 1000 objects
      if (listedObjects.IsTruncated) {
        // Recursive call to delete remaining objects
        await deleteFolderFromS3(folderPath);
      }

      return { success: true, message: "Folder deleted successfully" };
    } catch (error) {
      console.error("Error deleting folder from S3:", error);
      throw error;
    }
  };

  paginate = async (model, queryOptions, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    return Promise.all([
      model.findMany({
        ...queryOptions,
        skip,
        take: limit,
      }),
      model.count({ where: queryOptions.where }),
    ]).then(([data, total]) => ({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }));
  };
}
module.exports = new helper();