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
  port: process.env.PORT,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  db_port: process.env.DB_PORT,
}
module.exports = config;
