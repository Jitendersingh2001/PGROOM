const { PrismaClient } = require("@prisma/client");
const s3 = require("../config/awsS3");
const constant = require("../constant/constant");
const { uploadFileToS3 } = require("../utils/helper");
const { v4: uuidv4 } = require('uuid');

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
}

module.exports = PropertyService;