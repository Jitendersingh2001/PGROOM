const Joi = require('joi');
const helper = require("../utils/helper");
const http = require('../constant/statusCodes');

const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return helper.sendError(
      res,
      error.details[0].message,
      http.UNPROCESSABLE_ENTITY
    );
  }
};

module.exports = validateRequest;