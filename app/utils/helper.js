class helper {

    sendError = (res, message, statusCode) => {
        const response = {
            message: message,
            statusCode: statusCode ?? http.UNPROCESSABLE_ENTITY,
        };
        return res.json(response);
    }
}
module.exports = new helper();