const Joi = require('joi');

const propertyValidator = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .empty(['', null])
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .required()
    .empty(['', null])
    .messages({
      'any.required': 'Password is required',
    }),
});

module.exports = propertyValidator;
