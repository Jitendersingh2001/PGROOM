const Joi = require('joi');
const helper = require("../utils/helper");
const http = require('../constant/statusCodes');

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return helper.sendError(
      res,
      error.details[0].message,
      http.UNPROCESSABLE_ENTITY
    );
  }
  next();
};

module.exports = validateRequest;
