const { PrismaClient } = require("@prisma/client");
const helper = require("../utils/helper");
const http = require('../constant/statusCodes')
const constMessage = require("../constant/message")

class profileService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Function to get all states
   */
  async login(req, res) {
      try {
        const { email } = req.body;
        const user = await this.prisma.user.findUnique({
            where: {
              email,
            },
        });
        if (!user) {
            helper.sendError(
                res,
                constMessage.NOT_FOUND.replace(":name", "User"),
                http.NOT_FOUND
            )
          }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * function to create account
   */
  async createAccount(req, res) {
    try {
      
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
}

module.exports = profileService;
