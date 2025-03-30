const constant = require("../constant/constant");
const userRepository = require("../repository/userRepository");
const tenantRepository = require("../repository/tenantRepository");


class userService {
  constructor(repository,tenantRepository) {
    this.repository = repository;
    this.tenantRepository = tenantRepository;
  }

  /**
   * function to getTenants users
   */
  async getTenants(data) {
    try {
      // Parse pagination parameters
      const page = parseInt(data.page, 10) || 1;
      const limit = parseInt(data.limit, 10) || 10;
      const searchFields = ["firstName", "lastName"];
  
      // Fetch users with the specified role and search criteria
      const users = await this.repository.getUsersByRoleId(
        constant.TENANT_ROLE_ID,
        data.search,
        searchFields,
        page,
        limit
      );
  
      // Fetch tenant user IDs to exclude
      const tenantUserId = await this.tenantRepository.getTenantUserIds();
  
      // Filter out users whose IDs are in tenantUserId
      const filteredUsers = users.data.filter(user => 
        !tenantUserId.includes(user.user.id)
      );
  
      // Calculate updated metadata after filtering
      const totalFiltered = filteredUsers.length;
      const totalPages = Math.ceil(totalFiltered / limit);
  
      // Construct the final response
      return {
        data: filteredUsers,
        meta: {
          total: totalFiltered,
          page: page,
          limit: limit,
          totalPages: totalPages
        }
      };
    } catch (error) {
      // Rethrow the error for upstream handling
      throw error;
    }
  }
}

module.exports = new userService(userRepository,tenantRepository);
