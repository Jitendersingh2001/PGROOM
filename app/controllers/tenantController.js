const tenantService = require("../services/tenantService");
const Controller = require("./controller");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");
const constant = require("../constant/constant");

class tenantController extends Controller {
  constructor(tenantService) {
    super();
    this.tenantService = tenantService;
  }

   createTenant = async (req, res) => {
    try {
      const result = await this.tenantService.createTenant(req.body);
      this.sendResponse(
        res,
        result,
        constMessage.FETCH_SUCCESSFUL.replace(":name", "Tenant"),
        http.OK
      );
    } catch (error) {
      return this.sendErrorResponse(res, error);
    }
  }
}

module.exports = new tenantController(tenantService);
