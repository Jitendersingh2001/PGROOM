const jwt = require('jsonwebtoken');
const config = require("../config/initEnv");
class helper {

    sendError = (res, message, statusCode) => {
        const response = {
            message: message,
            statusCode: statusCode ?? http.UNPROCESSABLE_ENTITY,
        };
        return res.json(response);
    }

    generateToken= (userId, roleId) => {
        // Define the payload with userId and roleId
        const payload = {
          userId,
          roleId
        };
      
        // Secret key for signing the JWT
        const secretKey = config.jwt.jwt_secret_key;
      
        // Generate the JWT
        const token = jwt.sign(payload, secretKey);
        return token;
      }
}
module.exports = new helper();