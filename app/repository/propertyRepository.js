const { PrismaClient } = require("@prisma/client");
const constant = require("../constant/constant");
const {paginate} = require("../utils/helper");
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

  async getAllProperties(userId, page, limit) {
    try {
      const queryOptions = {
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
      };
  
      const result = await paginate(this.prisma.UserProperties, queryOptions, page, limit);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePropertyStatus(id, status) {
    try {
      const updatedProperty = await this.prisma.UserProperties.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });
      return updatedProperty;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = PropertyRepository;
