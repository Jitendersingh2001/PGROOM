const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const apiService = {
  /**
   * function to get all states
   */
  getAllStates: async (req) => {
    try {
      const states = await prisma.state.findMany({
        select: {
          id: true,
          stateName: true,
        },
      });
      return states;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * function to get all cities acc to state id
   */
  getCities: async (req, res) => {
    try {
      const cities = await prisma.city.findMany({
        where: {
          stateId: parseInt(req.params.id),
        },
        select: {
          id: true,
          cityName: true,
        },
      });
      res.json(cities);
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = apiService;
