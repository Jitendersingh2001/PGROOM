const nodemailer = require("nodemailer");
const config = require("../config/initEnv");
const helper = require("./helper");
const message = require("../constant/message");
const http = require("../constant/statusCodes");
const constant = require("../constant/constant");
const logger = require("./logger");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

// Create a transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: constant.TRUE,
    auth: {
      user: config.gmail.user,
      pass: config.gmail.pass,
      },
    //   logger: true,
    //   debug: true,
  });
};

// Send email function
const sendEmail = async (res, to, subject, templateName, templateData) => {
  try {
    const transporter = createTransporter();

    // Correct path to templates folder
    const templatePath = path.join(__dirname, '../templates', `${templateName}.handlebars`);
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const template = handlebars.compile(templateSource);

    // Generate the HTML content
    const html = template(templateData);

    const mailOptions = {
      from: config.gmail.user,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = sendEmail;
