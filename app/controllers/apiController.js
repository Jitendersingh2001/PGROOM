const apiService = require('../services/apiService');

const apiController = {

/**
 * function to get all states
 */
  getStates: async (req, res) => {
    try {
        return await apiService.getAllStates(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch state' });
    }
    },
    
    /**
     * function to get all cities acc to state id
     */
    getCities: async (req, res) => {
        try {
            return await apiService.getCities(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch cities' });
        }
    }
};

module.exports = apiController;
