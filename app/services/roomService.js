const { PrismaClient, PropertyStatus } = require("@prisma/client");
const s3 = require("../config/awsS3");
const constant = require("../constant/constant");
const {
  uploadFileToS3,
  getFileFromS3,
  deleteFileFromS3,
} = require("../utils/helper");
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
    addRoom = async (roomData, files) => {
        try {
            return "hello";
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new RoomService(roomRepository);
