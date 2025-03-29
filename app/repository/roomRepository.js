const { PrismaClient } = require("@prisma/client");
const constant = require("../constant/constant");
const { paginate } = require("../utils/helper");

class roomRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async addOrUpdateRoom(
    propertyId,
    roomNo,
    roomImage,
    totalBed,
    status,
    description,
    rent,
    id = null
  ) {
    try {
      const roomData = {
        propertyId,
        roomNo,
        roomImage,
        totalBed,
        status,
        description,
        rent,
      };

      // If `id` is null, create a new property
      if (id === null) {
        const newRoom = await this.prisma.rooms.create({
          data: roomData,
        });
        return newRoom;
      }

      // If `id` is provided, update the existing property
      const updateRoom = await this.prisma.rooms.upsert({
        where: {
          id: id,
        },
        update: roomData,
        create: roomData,
      });

      return updateRoom;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new roomRepository();
