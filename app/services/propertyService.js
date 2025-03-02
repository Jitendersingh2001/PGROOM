const { PrismaClient } = require("@prisma/client");
const s3 = require("../config/awsS3");
const constant = require("../constant/constant");
const { uploadFileToS3, getFileFromS3 , deleteFileFromS3} = require("../utils/helper");
const { v4: uuidv4 } = require("uuid");

class PropertyService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Function to add a property
   */
  async addProperty(req) {
    try {
      const data = req.body;
      const images = req.files;
      const userId = req.authUser.userId;
      const state = parseInt(data.state, 10);
      const city = parseInt(data.city, 10);

      // Upload images to S3 and generate unique file names
      const imageName = await Promise.all(
        images.map(async (file) => {
          const uniqueFileName = `${uuidv4()}-${file.originalname}`;
          return uploadFileToS3(
            file.buffer,
            uniqueFileName,
            file.mimetype,
            constant.PROPERTY_FOLDER
          );
        })
      );

      // Create a new property record in the database
      const property = await this.prisma.UserProperties.create({
        data: {
          userId: userId,
          state: state,
          city: city,
          propertyName: data.propertyName,
          propertyImage: imageName[0],
          status: constant.ACTIVE,
        },
      });

      return property;
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