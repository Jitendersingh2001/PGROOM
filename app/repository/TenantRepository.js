const BaseRepository = require("./BasePrismaRepository");
const constant = require("../constant/Constant");

class TenantRepository {
  constructor() {
    this.baseRepository = new BaseRepository("tenant");
    this.dbClient = this.baseRepository.getDBClient();
  }

  /**
   * Function to create tenant
   */
  async createOrUpdateTenant(userId, propertyId, roomId, id = null) {
    try {

      const tenantData = {
        userId,
        propertyId,
        roomId,
        status: constant.ACTIVE,
      };

      return id === null
      ? this.baseRepository.create(tenantData)
      : this.baseRepository.upsert({ id }, tenantData, tenantData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function to get tenant user ids
   */
  async getTenantUserIds() {
    try {
      const tenants = await this.dbClient.tenant.findMany({
        select: {
          userId: true,
        },
      });
      return tenants.map((tenant) => tenant.userId);
    } catch (error) {
      throw error;
    }
  }

  async getTenants(propertyId, roomId) {
    try {
      return await this.dbClient.tenant.findMany({
        where: {
          propertyId,
          roomId,
        },
        select: {
          userId: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
            }
          }
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TenantRepository();