const { PrismaClient } = require("@prisma/client");
const constant = require("../constant/constant");

class PropertyRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Function to add or update a property
   */
  async addOrUpdateProperty(
    userId,
    state,
    city,
    propertyName,
    propertyImage,
    propertyContact,
    propertyAddress,
    status,
    id = null
  ) {
    try {
      const propertyData = {
        userId,
        state,
        city,
        propertyName,
        propertyImage,
        propertyContact,
        propertyAddress,
        status,
      };

      // If `id` is null, create a new property
      if (id === null) {
        const newProperty = await this.prisma.UserProperties.create({
          data: propertyData,
        });
        return newProperty;
      }

      // If `id` is provided, update the existing property
      const updatedProperty = await this.prisma.UserProperties.upsert({
        where: {
          id: id,
        },
        update: propertyData,
        create: propertyData,
      });

      return updatedProperty;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllProperties(userId) {
    try {
      const properties = await this.prisma.UserProperties.findMany({
        where: {
          userId: userId,
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
        orderBy: {
          id: 'asc',
        },
      });
      return properties;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = PropertyRepository;
