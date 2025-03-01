const { PrismaClient } = require("@prisma/client");

class propertyService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Function add property
   */
  async addProperty(req) {
    try {
      return "hello";
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadImage(req,res) { 
    try {
      return "property";
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = propertyService;
