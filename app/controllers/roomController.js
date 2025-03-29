const propertyService = require("../services/propertyService");
const Controller = require("./controller");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");
const constant = require("../constant/constant");

class roomController extends Controller {
  constructor(propertyService) {
    super();
    this.propertyService = propertyService;
  }

    /**
     * Function to add room
     */
    addRoom = async (req, res) => {
        try {
            const result = "hellp";
            this.sendResponse(
                res,
                result,
                constMessage.CREATED_SUCCESSFULLY.replace(":name", "Room"),
                http.OK
            );
        } catch (error) {
            this.sendErrorResponse(res, error);
        }
    }
}

module.exports = new roomController(new propertyService());
