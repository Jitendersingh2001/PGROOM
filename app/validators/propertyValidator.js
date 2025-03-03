const Joi = require("joi");
const regex = require("../constant/Regex");

const propertyValidator = Joi.object({
  id : Joi.optional(),
  state: Joi.string()
    .required()
    .empty(["", null])
    .messages({
      "any.required": "State is required",
      "string.base": "State must be a string",
    }),
  city: Joi.string()
    .required()
    .empty(["", null])
    .messages({
      "any.required": "City is required",
      "string.base": "City must be a string",
    }),
  propertyName: Joi.string()
    .required()
    .empty(["", null])
    .messages({
      "any.required": "Property Name is required",
      "string.base": "Property Name must be a string",
    })
});

module.exports = propertyValidator;