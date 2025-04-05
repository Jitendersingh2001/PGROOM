const profileService = require("../services/profileService");
const Controller = require("./Controller");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");
const { loginValidator, registerValidator } = require("../validators/index");
const validateRequest = require("../middleware/validationMiddleware");

class ProfileController extends Controller {
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
        const message = result
          ? constMessage.CREATED_SUCCESSFULLY.replace(":name", "User")
          : constMessage.SOMETHING_WENT_WRONG;
        const status = result ? http.OK : http.INTERNAL_SERVER_ERROR;

        this.sendResponse(res, result, message, status);
      } catch (error) {
        this.sendErrorResponse(res, error);
      }
    },
  ];
}

module.exports = new ProfileController();
