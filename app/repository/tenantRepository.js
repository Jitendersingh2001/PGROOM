const { PrismaClient } = require("@prisma/client");
const constant = require("../constant/constant");
const { paginate } = require("../utils/helper");

class tenantRepository {
  constructor(prismaClient) {
    // Dependency injection for PrismaClient
    this.prisma = prismaClient || new PrismaClient();
  }
  async #createTenant(userId, propertyId, roomId, status = constant.ACTIVE) {
    try {
      const tenant = await this.prisma.tenant.create({
        data: {
          userId,
          propertyId,
          roomId,
          status,
        },
      });
      return tenant;
    } catch (error) {
      throw error;
    }
  }

  async #updateTenant(
    id,
    userId,
    propertyId,
    roomId,
    status = constant.ACTIVE
  ) {
    try {
      const tenant = await this.prisma.tenant.update({
        where: { id },
        data: {
          userId,
          propertyId,
          roomId,
          status,
        },
      });
      return tenant;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function to create tenant
   */
  async createOrUpdateTenant(userId, propertyId, roomId, id = null) {
    try {
      return id == null
        ? this.#createTenant(userId, propertyId, roomId)
        : this.#updateTenant(id, userId, propertyId, roomId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function to get tenant user ids
   */
  async getTenantUserIds() {
    try {
      const tenants = await this.prisma.tenant.findMany({
        select: {
          userId: true,
        },
      });
      return tenants.map((tenant) => tenant.userId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new tenantRepository();
