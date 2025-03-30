const { PrismaClient } = require("@prisma/client");
const constant = require("../constant/constant");
const {paginate} = require("../utils/helper");
class PropertyRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Function to create a property
   */
  async #createProperty(propertyData) {
    return this.prisma.userProperties.create({
      data: propertyData,
    });
  }

  /**
   * Function to update a property
   * If the property does not exist, it will create a new one
   * If the property exists, it will update the existing one
   */
  async #updateProperty(propertyId, propertyData) {
    return this.prisma.userProperties.upsert({
      where: {
        id: propertyId,
      },
      update: propertyData,
      create: propertyData,
    });
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
       return id === null
       ? this.#createProperty(propertyData)
         : this.#updateProperty(id, propertyData);
      
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
  
      const result = await paginate(this.prisma.userProperties, queryOptions, page, limit);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePropertyStatus(id, status) {
    try {
      const updatedProperty = await this.prisma.userProperties.update({
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
