const http = require('../constant/statusCodes');
const constMessage = require('../constant/message');
const logger = require('../utils/logger');

class Controller {
    sendResponse = (res, data, message, statusCode) => {
        const response = {
            message: message || constMessage.REQUEST_SUCCESSFUL,
            statusCode: statusCode ?? http.OK,
            data: data || null,
        };
        return res.json(response);
    }

    sendErrorResponse = (res, error) => {
        logger.error(error);
        const response = {
            message: error,
            statusCode: error.statusCode ?? http.INTERNAL_SERVER_ERROR,
        };
        return res.json(response);
    }
}

module.exports = Controller;
