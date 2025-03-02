const propertyService = require("../services/propertyService");
const Controller = require("./controller");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");
const constant = require("../constant/constant");

class propertyController extends Controller {
  constructor(propertyService) {
    super();
    this.propertyService = propertyService;
  }

  /**
   * Function to add property
   */
  addProperty = async (req, res) => {
    try {
      const result = await this.propertyService.addProperty(req);
      this.sendResponse(
        res,
        result,
        constMessage.CREATED_SUCCESSFULLY.replace(":name", "Property"),
        http.OK
      );
    } catch (error) {
      this.sendErrorResponse(res, error);
    }
  };

  /**
   * Function to get property
   */
  getProperty = async (req, res) => {
    try {
      const result = await this.propertyService.getProperty(req);
      const statusCode =
        result === constant.NOT_FOUND ? http.NOT_FOUND : http.OK;
      const message =
        result === constant.NOT_FOUND
          ? constMessage.NOT_FOUND.replace(":name", "Property")
          : constMessage.DELETED_SUCCESSFULLY.replace(":name", "Property");
      this.sendResponse(res, result, message, statusCode);
    } catch (error) {
      this.sendErrorResponse(res, error);
    }
  };

  /**
   * Function to delete property
   */
  deleteProperty = async (req, res) => {
    try {
      const result = await this.propertyService.deleteProperty(req);
      const statusCode =
        result === constant.NOT_FOUND ? http.NOT_FOUND : http.OK;
      const message =
        result === constant.NOT_FOUND
          ? constMessage.NOT_FOUND.replace(":name", "Property")
          : constMessage.DELETED_SUCCESSFULLY.replace(":name", "Property");
      this.sendResponse(res, result, message, statusCode);
    } catch (error) {
      this.sendErrorResponse(res, error);
    }
  };
}

module.exports = new propertyController(new propertyService());