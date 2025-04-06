const constant = require("../constant/Constant");
const tenantRepository = require("../repository/TenantRepository");
const { parseInputData } = require("../utils/DataParseHelper");

class tenantService {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Function to create tenant
   */
  async createTenant(data) {
    try {
      const parsedData = parseInputData(data, {
        integerFields: ["propertyId", "roomId"],
        integerArrayFields: ["userIds"],
      });

      return await Promise.all(
        parsedData.userIds.map((userId) =>
          this.repository.createOrUpdateTenant(
            userId,
            parsedData.propertyId,
            parsedData.roomId
          )
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /*
   * Function to update tenant
   */
  async updateTenant(data) {
    try {
      const {
        propertyId,
        roomId,
        userIds = [],
        ids = [],
      } = parseInputData(data, {
        integerFields: ["propertyId", "roomId"],
        integerArrayFields: ["userIds", "ids"],
      });

      const existingTenants = await this.repository.getTenants(
        propertyId,
        roomId
      );
      const existingIds = existingTenants.map(({ id }) => id);

      const idsToDelete = existingIds.filter((id) => !ids.includes(id));
      const hasNewUserIds = userIds.length > 0;

      if (idsToDelete.length > 0) {
        await this.deleteTenant({ ids: idsToDelete });
      }

      if (hasNewUserIds) {
        const deletedTenants = await this.repository.getTenants(
          propertyId,
          roomId,
          constant.DELETED
        );
        const tenantsToRestore = deletedTenants.filter((tenant) =>
          userIds.includes(tenant.userId)
        );
        const idsToRestore = tenantsToRestore.map((t) => t.id);
        const restoredUserIds = tenantsToRestore.map((t) => t.userId);
        const newUserIds = userIds.filter(
          (id) => !restoredUserIds.includes(id)
        );
        if (idsToRestore.length > 0) {
          await Promise.all(
            idsToRestore.map((id) => this.repository.updateTenant(id))
          );
        }
        

        if (newUserIds.length > 0) {
          await this.createTenant({ propertyId, roomId, userIds: newUserIds });
        }
      }

      return true;
    } catch (error) {
      // Optionally log or rewrap error with context
      throw new Error(`updateTenant failed: ${error.message}`);
    }
  }

  /**
   * Function to get tenants
   */
  async getTenants(data) {
    try {
      const parsedData = parseInputData(data, {
        integerFields: ["propertyId", "roomId"],
      });

      // Fetch tenants from the repository using propertyId and roomId
      const tenants = await this.repository.getTenants(
        parsedData.propertyId,
        parsedData.roomId
      );

      return tenants.map((tenant) => ({
        id: tenant.id,
        userId: tenant.userId,
        username: `${tenant.user.firstName} ${tenant.user.lastName}`,
      }));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function to delete tenant
   */
  async deleteTenant(data) {
    try {
      const ids = data.ids.map((id) => parseInt(id, 10));

      return await Promise.all(
        ids.map((id) => this.repository.updateTenant(id, constant.DELETED))
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new tenantService(tenantRepository);
