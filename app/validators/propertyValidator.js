const Joi = require("joi");
const regex = require("../constant/Regex");

const propertyValidator = Joi.object({
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
    }),
  propertyImage: Joi.string()
    .required()
    .empty(["", null])
    .pattern(new RegExp(regex.base64))
    .messages({
      "any.required": "Image is required",
      "string.base": "Image must be a string",
      "string.pattern.base": "Image must be a valid Base64 string",
    }),
});

module.exports = propertyValidator;