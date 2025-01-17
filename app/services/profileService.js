const { PrismaClient } = require("@prisma/client");

class profileService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Function to get all states
   */
  async login(req) {
    try {
      const states = await this.prisma.state.findMany({
        select: {
          id: true,
          stateName: true,
        },
      });
      return states;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = profileService;
