const constant = require("../constant/constant");
const userRepository = require("../repository/userRepository");

class userService {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * function to getTenants users
   */
  async getTenants (data) {
      try {
        const page = parseInt(data.page, 10) || 1;
        const limit = parseInt(data.limit, 10) || 10;
    const users = this.repository.getUsersByRoleId(
        constant.TENANT_ROLE_ID,
        data.search,
        page,
        limit
    );
      return users;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new userService(userRepository);
