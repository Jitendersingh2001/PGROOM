const userService = require("../services/userService");
const Controller = require("./controller");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");
const constant = require("../constant/constant");

class userController extends Controller {
  constructor(userService) {
    super();
    this.userService = userService;
  }

  /**
   * fucntion to getTenants users
   */
  getTenants = async (req, res) => {
      try {
      const result = await this.userService.getTenants(req.query);
      this.sendResponse(
        res,
        result,
        constMessage.FETCH_SUCCESSFUL.replace(":name", "Tenants"),
        http.OK
      );
    } catch (error) {
      this.sendErrorResponse(res, error);
    }
  };
}

module.exports = new userController(userService);
