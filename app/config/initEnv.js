// initEnv.js
const dotenv = require("dotenv");

// Load the environment variables from the .env file
const result = dotenv.config();

// Check if there was an issue loading the .env file
if (result.error) {
  throw result.error;
}

const config = {
  server: {
    port: process.env.PORT,
  },
  db: {
    databaseURL: process.env.DATABASE_URL,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    db_port: process.env.DB_PORT,
  },
  jwt: {
    jwt_secret_key: process.env.JWT_SECRET_KEY,
  },
  gmail: {
    user : process.env.GMIAL_USER_MAIL,
    pass : process.env.GMAIL_APP_PASSWORD,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketRegion: process.env.AWS_BUCKET_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
  }
};
module.exports = config;
