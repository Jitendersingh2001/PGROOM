const roomService = require("../services/roomService");
const Controller = require("./controller");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");
const constant = require("../constant/constant");

class roomController extends Controller {
  constructor(roomService) {
    super();
    this.roomService = roomService;
  }

    /**
     * Function to add room
     */
    addRoom = async (req, res) => {
        try {
            const result = await this.roomService.addRoom(req.body, req.files);
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

module.exports = new roomController(roomService);
