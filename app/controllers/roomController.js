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
  };

  /**
   * Function to update room
   */
  updateRoom = async (req, res) => {
    try {
      const result = await this.roomService.updateRoom(req.body, req.files);
      this.sendResponse(
        res,
        result,
        constMessage.UPDATED_SUCCESSFULLY.replace(":name", "Room"),
        http.OK
      );
    } catch (error) {
      this.sendErrorResponse(res, error);
    }
  };
  /**
   * Function to get all rooms
   */
  getAllRooms = async (req, res) => {
    try {
      const result = await this.roomService.getAllRooms(req.body);
      this.sendResponse(
        res,
        result,
        constMessage.FETCH_SUCCESSFUL.replace(":name", "Room"),
        http.OK
      );
    } catch (error) {
      this.sendErrorResponse(res, error);
    }
  };
  /**
   * Function to get room
   */
  getRoom = async (req, res) => {
    try {
      const result = await this.roomService.getRoom(req.params.id);
      this.sendResponse(
        res,
        result,
        constMessage.FETCH_SUCCESSFUL.replace(":name", "Room"),
        http.OK
      );
    } catch (error) {
      this.sendErrorResponse(res, error);
    }
  };
  /**
   * Function to delete room
   */
  deleteRoom = async (req, res) => {
    try {
      const result = await this.roomService.deleteRoom(req.params.id);
      if (result === constant.NOT_FOUND) {
        this.sendResponse(
          res,
          result,
          constMessage.NOT_FOUND.replace(":name", "Room"),
          http.NOT_FOUND
        );
      } else {
        this.sendResponse(
          res,
          result,
          constMessage.DELETED_SUCCESSFULLY.replace(":name", "Room"),
          http.OK
        );
      }
    } catch (error) {
      this.sendErrorResponse(res, error);
    }
  };
}

module.exports = new roomController(roomService);
