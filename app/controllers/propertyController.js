const ApiService = require("../services/apiService");
const Controller = require("./controller");
const http = require('../constant/statusCodes');
const constMessage = require('../constant/message');

class propertyController extends Controller {
  constructor() {
    super();
    this.apiService = new ApiService();
  }
}

module.exports = new propertyController();
