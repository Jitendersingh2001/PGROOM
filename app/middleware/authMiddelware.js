const jwt = require('jsonwebtoken');
const config = require('../config/initEnv');
const helper = require("../utils/helper");
const http = require("../constant/statusCodes");
const constMessage = require("../constant/message");

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return helper.sendError(
            res,
            constMessage.UNAUTHORIZED,
            http.UNAUTHORIZED
        );
    }

    try {
        const decoded = jwt.verify(token, config.jwt.jwt_secret_key);
        req.user = decoded;
        next();
    } catch (err) {
        return helper.sendError(
            res,
            constMessage.UNAUTHORIZED,
            http.UNAUTHORIZED
        );
    }
};

module.exports = authMiddleware;