const propertyService = require("../services/propertyService");
const Controller = require("./controller");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");
const ImageFactory = require("../factories/imageFactory");

class imageController extends Controller {
  constructor(propertyService) {
    super();
    this.propertyService = propertyService;
  }

  /**
   * Function upload image
   */
  uploadImage = async (req, res) => {
    try {
      const type = req.body.type;
      const files = req.files;
      const imageService = ImageFactory.create(type);
      const result = await imageService.uploadImage(req, res);
      this.sendResponse(
        res,
        result,
        constMessage.FETCH_SUCCESSFUL.replace(":name", "States"),
        http.OK
      );
    } catch (error) {
      this.sendErrorResponse(res, error);
    }
  };
}

module.exports = new imageController();
