const tenantService = require("../services/TenantService");
const Controller = require("./Controller");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/Message");
const constant = require("../constant/Constant");

class TenantController extends Controller {
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
  
  updateTenant = async (req, res) => {
    try {
      const result = await this.tenantService.updateTenant(req.body);
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

module.exports = new TenantController(tenantService);
