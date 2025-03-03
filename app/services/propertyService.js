const { PrismaClient } = require("@prisma/client");
const s3 = require("../config/awsS3");
const constant = require("../constant/constant");
const { uploadFileToS3, getFileFromS3 , deleteFileFromS3} = require("../utils/helper");
const { v4: uuidv4 } = require("uuid");
const propertyRepository = require("../repository/propertyRepository");

class PropertyService {
  constructor() {
    this.prisma = new PrismaClient();
    this.propertyRepository = new propertyRepository();
  }

  /**
   * Function to add a property
   */
  async addProperty(req) {
    try {
      const data = req.body;
      const image = req.files;
      const userId = req.authUser.userId;
      const state = parseInt(data.state, 10);
      const city = parseInt(data.city, 10);

      const imageName = await this.createOrUpdateImage(image[0]);
      return await this.propertyRepository.addOrUpdateProperty(
        userId,
        state,
        city,
        data.propertyName,
        imageName,
        constant.ACTIVE);
      
    } catch (error) {
      throw new Error(error);
    }
  }

  async createOrUpdateImage(image, id = null) 
  {
    try {
      // If `id` is present, it means we are updating the image
      if (id) {
        // Delete the existing file from S3 if updating
        await deleteFileFromS3(image);
      }
  
      // Generate a unique file name for the new image
      const uniqueFileName = `${uuidv4()}-${image.originalname}`;
      // Upload the single image to S3
      const uploadedImage = await uploadFileToS3(
        image.buffer,
        uniqueFileName,
        image.mimetype,
        constant.PROPERTY_FOLDER
      );
  
      // Return the uploaded image details (e.g., URL or metadata)
      return uploadedImage;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Function to get a property
   */
  async getProperty(req) {
    try {
      // Parse the property ID from the request parameters
      const id = parseInt(req.params.id, 10);

      // Fetch the property along with state and city details
      const property = await this.prisma.UserProperties.findUnique({
        where: {
          id: id,
          status: constant.ACTIVE,
        },
        include: {
          user: {
            include: {
              state: true,
              city: true,
            },
          },
        },
      });

      // If no property is found, return a consistent response
      if (!property) {
        return constant.NOT_FOUND;
      }

      // Generate the signed URL for the property image
      const propertyImage = await getFileFromS3(
        property.propertyImage,
        constant.S3_EXPIRY
      );

      // Construct the final response object
      const responseData = {
        id: property.id,
        state: property.user.state.stateName,
        city: property.user.city.cityName,
        propertyName: property.propertyName,
        propertyImage: propertyImage,
      };

      return responseData;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Function to delete a property
   */
  async deleteProperty(req) {
    try {
      // Parse the property ID from the request parameters
      const id = parseInt(req.params.id, 10);
      // Fetch the property record from the database
      const property = await this.prisma.UserProperties.findUnique({
        where: {
          id: id,
          status: constant.ACTIVE,
        },
      });

      // If no property is found, return a consistent response
      if (!property) {
        return constant.NOT_FOUND;
      }

      // Update the property status to 'DELETED'
      const updatedProperty = await this.prisma.UserProperties.update({
        where: {
          id: id,
        },
        data: {
          status: constant.DELETED,
        },
      });
      if (updatedProperty) {
        await deleteFileFromS3(
          property.propertyImage
        );
      }
        return updatedProperty;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = PropertyService;