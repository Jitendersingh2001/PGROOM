const s3 = require("../config/awsS3");
const { 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand 
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

class awsHelper {
  /**
   * Uploads a file to an S3 bucket.
   * @param {Buffer} fileBuffer - The file content as a buffer.
   * @param {string} fileName - The name of the file to be uploaded.
   * @param {string} fileType - The MIME type of the file (e.g., 'image/jpeg').
   * @param {string} folderName - The folder in the S3 bucket where the file will be stored.
   * @returns {Promise<string>} - The full S3 key (path) of the uploaded file.
   * @throws {Error} - Throws an error if the upload fails.
   */
  uploadFileToS3 = async (fileBuffer, fileName, fileType, folderName) => {
    try {
      // Define S3 upload parameters
      const params = {
        Bucket: constant.S3_BUCKET_NAME, // Name of the S3 bucket
        Key: `${folderName}/${fileName}`, // Full path (key) for the file in S3
        Body: fileBuffer, // File content as a buffer
        ContentType: fileType, // MIME type of the file
      };

      // Upload the file using PutObjectCommand
      await s3.send(new PutObjectCommand(params));

      // Return the full S3 key (path) of the uploaded file
      return `${folderName}/${fileName}`;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Generates a signed URL for accessing a file in S3.
   * @param {string} fileName - The S3 key (path) of the file.
   * @param {number} expiresIn - The duration (in seconds) for which the signed URL is valid.
   * @returns {Promise<string>} - The signed URL for accessing the file.
   * @throws {Error} - Throws an error if the signed URL generation fails.
   */
  getFileFromS3 = async (fileName, expiresIn) => {
    try {
      const command = new GetObjectCommand({
        Bucket: constant.S3_BUCKET_NAME,
        Key: fileName,
      });

      // Generate and return a signed URL for the file
      return await getSignedUrl(s3, command, { expiresIn });
    } catch (error) {
      throw error;
    }
  };

  /**
   * Deletes a single file from an S3 bucket.
   * @param {string} fileName - The S3 key (path) of the file to delete.
   * @returns {Promise<object>} - A success message indicating the file was deleted.
   * @throws {Error} - Throws an error if the deletion fails.
   */
  deleteFileFromS3 = async (fileName) => {
    try {
      // Define S3 delete parameters
      const params = {
        Bucket: constant.S3_BUCKET_NAME,
        Key: fileName,
      };

      // Create and send the delete command
      const command = new DeleteObjectCommand(params);
      await s3.send(command);

      // Return a success message
      return { success: true, message: "File deleted successfully" };
    } catch (error) {
      throw error;
    }
  };

  /**
   * Deletes all files within a folder in an S3 bucket.
   * @param {string} folderPath - The S3 key prefix (path) of the folder to delete.
   * @returns {Promise<object>} - A success message indicating the folder was deleted.
   * @throws {Error} - Throws an error if the deletion fails.
   */
  deleteFolderFromS3 = async (folderPath) => {
    try {
      // First, list all objects in the folder
      const listParams = {
        Bucket: constant.S3_BUCKET_NAME,
        Prefix: folderPath,
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
        await this.deleteFolderFromS3(folderPath);
      }

      // Return a success message
      return { success: true, message: "Folder deleted successfully" };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new awsHelper();