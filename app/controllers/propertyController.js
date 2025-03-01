const propertyService = require("../services/propertyService");
const Controller = require("./controller");
const http = require('../constant/statusCodes');
const constMessage = require('../constant/message');

class propertyController extends Controller {
    constructor(propertyService) {
    super();
    this.propertyService = propertyService;
  }
}

module.exports = new propertyController(propertyService);
