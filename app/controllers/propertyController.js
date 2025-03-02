const propertyService = require("../services/propertyService");
const Controller = require("./controller");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");

class propertyController extends Controller {
  constructor(propertyService) {
    super();
    this.propertyService = propertyService;
  }

  /**
   * function to add property
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
   * function to add property
   */
    getProperty = async (req, res) => {
      try {
      const result = await this.propertyService.getProperty(req);
        this.sendResponse(
          res,
          result,
          constMessage.FETCH_SUCCESSFUL.replace(":name", "Property"),
          http.OK
        );
      } catch (error) {
        this.sendErrorResponse(res, error);
      }
    };
}

module.exports = new propertyController(new propertyService());
