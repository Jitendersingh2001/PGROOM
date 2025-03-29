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
    async addRoom(data, images) {
        try {
            const propertyId = parseInt(data.propertyId, 10);
            const roomNo = parseInt(data.roomNo, 10);
            const totalBed = parseInt(data.totalBeds, 10);
            const uploadedImages = await this.createOrUpdateImages(images, propertyId);
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

    async createOrUpdateImages(images, subFolder) {
        try {
            let uploadImage = [];
            for (const image of images) {
                const uniqueFileName = `${uuidv4()}-${image.originalname}`;
                const roomFolder = `${constant.ROOM_FOLDER}/${subFolder}`;
                const imageName = await uploadFileToS3(
                    image.buffer,
                    uniqueFileName,
                    image.mimetype,
                    roomFolder
                );
                uploadImage.push(imageName);
            }
            return uploadImage;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new RoomService(roomRepository);
