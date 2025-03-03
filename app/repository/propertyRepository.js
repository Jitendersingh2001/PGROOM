const { PrismaClient } = require("@prisma/client");

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
          id: id, // Ensure `id` is a valid integer
        },
        update: propertyData,
        create: propertyData,
      });

      return updatedProperty;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = PropertyRepository;