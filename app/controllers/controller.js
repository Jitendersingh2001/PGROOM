const http = require('../constant/statusCodes');
const constMessage = require('../constant/message');
const message = require('../constant/message');

const controller = {

    sendResponse: (res, data, message, statusCode) => {
        const response = {
            message: message || constMessage.REQUEST_SUCCESSFUL,
            statusCode : statusCode ?? http.OK,
            data: data || null
        };
        return res.json(response);
    },

    sendErrorResponse: (res, error) => {
        const response = {
            message: constMessage.SOMETHING_WENT_WRONG,
            statusCode: error.statusCode ?? http.INTERNAL_SERVER_ERROR,
        }
        return res.json(response);
    }
};

module.exports = controller;
