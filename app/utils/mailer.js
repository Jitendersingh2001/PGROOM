const nodemailer = require("nodemailer");
const config = require("../config/initEnv");
const helper = require("./helper");
const message = require("../constant/message");
const http = require("../constant/statusCodes");
const constant = require("../constant/constant");
const logger = require("./logger");

// Create a transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: constant.TRUE,
    auth: {
      user: config.gmail.user,
      pass: config.gmail.pass,
      }
  });
};

// Send email function
const sendEmail = async (res, to, subject, text, html) => {
  try {
      const transporter = createTransporter();
    const mailOptions = {
      from: config.gmail.user,
      to,
      subject,
      text
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = sendEmail;
