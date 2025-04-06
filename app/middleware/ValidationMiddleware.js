const Joi = require('joi');
const helper = require("../utils/Helper");
const http = require('../constant/StatusCodes');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ValidateRequest = (schema) => async (req, res, next) => {
  try {
    // If schema has custom validation functions, pass the context
    const validationOptions = {
      context: { prisma }
    };
    
    await schema.validateAsync(req.body, validationOptions);
    next();
  } catch (error) {
    return helper.sendError(
      res,
      error.details[0].message,
      http.UNPROCESSABLE_ENTITY
    );
  }
};

module.exports = ValidateRequest;