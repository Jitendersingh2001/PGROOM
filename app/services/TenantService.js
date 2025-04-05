const constant = require("../constant/Constant");
const tenantRepository = require("../repository/TenantRepository");

class tenantService {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Function to create tenant
   */
  async createTenant(data) {
    try {
      const propertyId = parseInt(data.propertyId, 10);
      const roomId = parseInt(data.roomId, 10);
      const userIds = data.userIds.map(userId => parseInt(userId, 10));
  
      const res = await Promise.all(
        userIds.map(userId => 
          this.repository.createOrUpdateTenant(userId, propertyId, roomId)
        )
      );
  
      return res;
    } catch (error) {
      throw error;
    }
  }

  /*
    * Function to update tenant
    */
  async updateTenant(data) {
    try {
      const propertyId = parseInt(data.propertyId, 10);
      const roomId = parseInt(data.roomId, 10);
      const userIds = data.userIds.map(userId => parseInt(userId, 10));
  
      const res = await Promise.all(
        userIds.map(userId => 
          this.repository.createOrUpdateTenant(userId, propertyId, roomId)
        )
      );
  
      return res;
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = new tenantService(tenantRepository);
