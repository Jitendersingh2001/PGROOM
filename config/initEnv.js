// initEnv.js
const dotenv = require('dotenv');

// Load the environment variables from the .env file
const result = dotenv.config();

// Check if there was an issue loading the .env file
if (result.error) {
  throw result.error;
}

const config = {
  databaseURL: process.env.DATABASE_URL,
  port: process.env.PORT
}
module.exports = config;
