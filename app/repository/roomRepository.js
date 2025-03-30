const { PrismaClient } = require("@prisma/client");
const constant = require("../constant/constant");
const { paginate } = require("../utils/helper");

class roomRepository {
  constructor(prismaClient) {
    // Dependency injection for PrismaClient
    this.prisma = prismaClient || new PrismaClient();
  }

  /**
   * Function to create a room
   */
  async #createRoom(roomData) {
    return this.prisma.rooms.create({
      data: roomData,
    });
  }

  /**
   * Function to update a room
   * If the room does not exist, it will create a new one
   * If the room exists, it will update the existing one
   */
  async #updateRoom(roomId, roomData) {
    return this.prisma.rooms.upsert({
      where: {
        id: roomId,
      },
      update: roomData,
      create: roomData,
    });
  }

  /**
   * Function to add or update a room
   */
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
      return id === null
        ? this.#createRoom(roomData)
        : this.#updateRoom(id, roomData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Function to get all rooms
   */
  async getAllRooms(propertyId, page, limit) {
    try {
      const queryOptions = {
        where: {
          propertyId: propertyId,
          status: constant.ACTIVE,
        },
        orderBy: {
          id: "asc",
        },
      };
      const result = await paginate(
        this.prisma.rooms,
        queryOptions,
        page,
        limit
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Function to get a room by ID
   */
  async getRoom(roomId) {
    try {
      const room = await this.prisma.rooms.findUnique({
        where: {
          id: roomId,
        },
      });
      return room;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Function to update the status of a room
   */
  async updateRoomStatus(roomId, status) {
    try {
      const updatedRoom = await this.prisma.rooms.update({
        where: {
          id: roomId,
        },
        data: {
          status: status,
        },
      });
      return updatedRoom;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new roomRepository();
