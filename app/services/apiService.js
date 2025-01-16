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
      console.error(error);
      res.status(500).json({ error: "Failed to fetch states" });
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
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch cities' });
        }
    }
};

module.exports = apiService;
