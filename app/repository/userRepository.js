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
    async getUsersByRoleId(roleId, searchInput, searchFields, page, limit) {
        try {
            const searchConditions = searchInput
            ? searchFields.map(field => ({ [field]: { contains: searchInput, mode: 'insensitive' } }))
            : undefined;
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
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            status: true,
                        }
                    }
                },
            };
            return await paginate(this.prisma.userRoleLink, queryOptions, page, limit)
        } catch (error) {
            throw error;
        }
    }    
}

module.exports = new userRepository();
