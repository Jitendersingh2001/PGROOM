const { PrismaClient } = require("@prisma/client");
const constant = require("../constant/constant");
const { paginate } = require("../utils/helper");

class roomRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }
}

module.exports = roomRepository;
