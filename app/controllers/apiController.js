const apiService = require("../services/apiService");
const controller = require("./controller");
const constMessage = require("../constant/message");
const http = require("../constant/statusCodes");

const apiController = {
  /**
   * Function to get all states
   */
  getStates: async (req, res) => {
    try {
      const result = await apiService.getAllStates(req);
      controller.sendResponse(
        res,
        result,
        constMessage.FETCH_SUCCESSFUL.replace(":name", "States"),
        http.OK
      );
    } catch (error) {
      controller.sendErrorResponse(res, error);
    }
  },

  /**
   * Function to get all cities according to state id
   */
  getCities: async (req, res) => {
    try {
      const result = await apiService.getCities(req, res);
      controller.sendResponse(
        res,
        result,
        constMessage.FETCH_SUCCESSFUL.replace(":name", "Cities"),
        http.OK
      );
    } catch (error) {
      controller.sendErrorResponse(res, error);
    }
  },
};

module.exports = apiController;
