const { PrismaClient } = require("@prisma/client");
const constant = require("../constant/constant");
const { paginate } = require("../utils/helper");

class userRepository {
  constructor(prismaClient) {
    // Dependency injection for PrismaClient
    this.prisma = prismaClient || new PrismaClient();
  }

  #buildSearchConditions(searchInput, searchFields) {
    if (!searchInput) return undefined;

    return searchFields.map((field) => ({
      [field]: { contains: searchInput, mode: "insensitive" },
    }));
  }

  #buildSelectedColumns(defaultColumns, additionalColumns) {
    return additionalColumns.reduce(
      (acc, column) => {
        acc[column] = true;
        return acc;
      },
      { ...defaultColumns }
    );
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
      const defaultColumns = {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
      };
      // Build reusable components
      const searchConditions = this.#buildSearchConditions(
        searchInput,
        searchFields
      );
      const selectedColumns = this.#buildSelectedColumns(
        defaultColumns,
        additionalColumns
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
