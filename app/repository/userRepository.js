const { PrismaClient } = require("@prisma/client");
const constant = require("../constant/constant");
const { paginate } = require("../utils/helper");

class userRepository {
  constructor(prismaClient) {
    // Dependency injection for PrismaClient
    this.prisma = prismaClient || new PrismaClient();
  }

  /**
   * function to get user ids by role id
   */
  async getUsersByRoleId(
    roleId,
    searchInput,
    searchFields,
    page,
    limit,
    additionalColumns = []
  ) {
    try {
      const searchConditions = searchInput
        ? searchFields.map((field) => ({
            [field]: { contains: searchInput, mode: "insensitive" },
          }))
        : undefined;
      const defaultColumns = {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
      };
      // Merge default columns with additional ones
      const selectedColumns = additionalColumns.reduce(
        (acc, column) => {
          acc[column] = true;
          return acc;
        },
        { ...defaultColumns }
      );
      const queryOptions = {
        where: {
          roleId: roleId,
          user: {
            status: constant.ACTIVE,
            OR: searchConditions,
          },
        },
        select: {
          user: {
            select: selectedColumns,
          },
        },
      };
      return await paginate(
        this.prisma.userRoleLink,
        queryOptions,
        page,
        limit
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new userRepository();
