const profileService = require("../services/profileService");
const Controller = require("./controller");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");
const {
  loginValidator,
  registerValidator,
} = require("../validators/index");
const validateRequest = require('../middleware/validationMiddleware');

class profileController extends Controller {
  constructor() {
    super();
    this.profileService = new profileService();
  }

  /**
   * Function to login
   */
  login = [
    validateRequest(loginValidator),
    async (req, res) => {
      try {
        const result = await this.profileService.login(req, res);
        this.sendResponse(
          res,
          result,
          constMessage.FETCH_SUCCESSFUL.replace(":name", "User"),
          http.OK
        );
      } catch (error) {
        this.sendErrorResponse(res, error);
      }
    },
  ];
  
    /**
   * Function to register
   */
    createAccount = [
      validateRequest(registerValidator),
      async (req, res) => {
        try {
          const result = await this.profileService.createAccount(req, res);
          this.sendResponse(
            res,
            result,
            constMessage.FETCH_SUCCESSFUL.replace(":name", "User"),
            http.OK
          );
        } catch (error) {
          this.sendErrorResponse(res, error);
        }
      },
    ];
}

module.exports = new profileController();
