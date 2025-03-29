const { PrismaClient, PropertyStatus } = require("@prisma/client");
const s3 = require("../config/awsS3");
const constant = require("../constant/constant");
const {
  uploadFileToS3,
  getFileFromS3,
  deleteFolderFromS3,
} = require("../utils/awsHelper");
const { v4: uuidv4 } = require("uuid");
const roomRepository = require("../repository/roomRepository");

class RoomService {
  constructor(repository) {
    this.prisma = new PrismaClient();
    this.repository = repository;
  }

  /**
   * Function to add room
   */
  async addRoom(data, images) {
    try {
      const propertyId = parseInt(data.propertyId, 10);
      const roomNo = parseInt(data.roomNo, 10);
      const totalBed = parseInt(data.totalBeds, 10);
      const uploadedImages = await this.createOrUpdateImages(
        images,
        propertyId
      );
      const Room = await this.repository.addOrUpdateRoom(
        propertyId,
        roomNo,
        JSON.stringify(uploadedImages),
        totalBed,
        data.status,
        data.description,
        data.rent
      );
      return Room;
    } catch (error) {
      throw error;
    }
  }

  async createOrUpdateImages(images, subFolder, id = null) {
    try {
      const roomFolder = `${constant.ROOM_FOLDER}/${subFolder}`;
      if (id) {
        // If an ID is provided, delete the existing folder from S3
        const deletionResult = await deleteFolderFromS3(
          `${constant.ROOM_FOLDER}/${subFolder}/`
        );
        if (!deletionResult) {
          throw new Error(`Failed to delete folder: ${roomFolder}`);
        }
      }
      const uploadPromises = images.map(async (image) => {
        const uniqueFileName = `${uuidv4()}-${image.originalname}`;
        return uploadFileToS3(
          image.buffer,
          uniqueFileName,
          image.mimetype,
          roomFolder
        );
      });

      // Wait for all uploads to complete
      return Promise.all(uploadPromises);
    } catch (error) {
      throw error;
    }
  }
  /**
   * Function to update room
   */
  async updateRoom(data, images) {
    try {
      const propertyId = parseInt(data.propertyId, 10);
      const roomNo = parseInt(data.roomNo, 10);
      const totalBed = parseInt(data.totalBeds, 10);
      const id = parseInt(data.id, 10);
      const uploadedImages = await this.createOrUpdateImages(
        images,
        propertyId,
        id
      );
      const Room = await this.repository.addOrUpdateRoom(
        propertyId,
        roomNo,
        JSON.stringify(uploadedImages),
        totalBed,
        data.status,
        data.description,
        data.rent,
        id
      );
      return Room;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RoomService(roomRepository);
