const { PrismaClient } = require("@prisma/client");
const helper = require("../utils/helper");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");
const bcrypt = require("bcrypt");
const constant = require("../constant/constant");
const { add } = require("winston");

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
        );
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
      // Create the user
      const user = await this.prisma.user.create({
        data: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          mobileNo: req.body.mobileNo,
          state: {
            connect: { id: req.body.state },
          },
          city: {
            connect: { id: req.body.city },
          },
          password: await bcrypt.hash(req.body.password, 10),
          status: constant.ACTIVE,
          address: req.body.address,
        },
      });

      // Create the user role link
      await this.prisma.userRoleLink.create({
        data: {
          userId: user.id,
          roleId: req.body.isAdmin
            ? constant.ADMIN_ROLE_ID
            : constant.USER_ROLE_ID,
        },
      });

      return true;
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error(error.message); // Ensure only the error message is passed
    }
  }
}

module.exports = profileService;
