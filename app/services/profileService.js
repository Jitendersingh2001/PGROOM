const { PrismaClient } = require("@prisma/client");
const helper = require("../utils/helper");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");
const bcrypt = require("bcrypt");
const constant = require("../constant/constant");

class profileService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Function to get all states
   */
  async login(req, res) {
    const { email, password } = req.body;
    try {
      let token = null;
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: {
          roles: true,
        },
      });
  
      if (!user) {
        return helper.sendError(
          res,
          constMessage.NOT_FOUND.replace(":name", "User"),
          http.NOT_FOUND
        );
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      const roleId = user.roles[0].roleId;
      if (!isPasswordValid) {
        return helper.sendError(
          res,
          constMessage.WRONG_PASSWORD,
          http.UNAUTHORIZED
        );
      }
      if (user && isPasswordValid) {
        token = helper.generateToken(user.id, roleId);
      }
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNo: user.mobileNo,
        state: user.stateId,
        city: user.cityId,
        address: user.address,
        token : token
      };
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
      throw new Error(error);
    }
  }
}

module.exports = profileService;
