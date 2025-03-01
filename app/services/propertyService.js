const { PrismaClient } = require("@prisma/client");

class propertyService {
  constructor() {
    this.prisma = new PrismaClient();
  }
}

module.exports = propertyService;
