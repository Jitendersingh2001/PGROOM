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
    async getUsersByRoleId(roleId, searchInput, page, limit) {
        try {
            const queryOptions = {
                where: {
                    roleId: roleId,
                    user: {
                        status: constant.ACTIVE,
                        OR: searchInput
                            ? [
                                { firstName: { contains: searchInput, mode: 'insensitive' } },
                                { lastName: { contains: searchInput, mode: 'insensitive' } }
                            ]
                            : undefined,
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
