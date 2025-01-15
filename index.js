let config = require('./config/initEnv');
const PORT = config.port || 3000;
console.log(`The port is: ${PORT}`);