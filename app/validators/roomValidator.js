const Joi = require("joi");
const regex = require("../constant/Regex");

const propertyValidator = Joi.object({
    propertyId: Joi.string().required().empty(["", null]).messages({
        "any.required": "Property Id is required",
        "string.base": "Property Id must be a string",
    }),
    roomNo : Joi.string().required().empty(["", null]).messages({
        "any.required": "Room No is required",
        "string.base": "Room No must be a string",
    }),
    totalBeds: Joi.number().required().empty(["", null]).messages({
        "any.required": "Total Beds is required",
        "number.base": "Total Beds must be a number",
    }),
    Description: Joi.string().required().empty(["", null]).messages({
        "any.required": "Description is required",
        "string.base": "Description must be a string",
    }),
});

module.exports = propertyValidator;
