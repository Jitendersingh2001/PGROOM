const express = require('express');
const cors = require('cors');
const session = require('express-session');
const crypto = require('crypto');
const app = express();
const apiRoutes = require('./routes/api.js');

// Generate a secure random session secret using crypto
const secret = crypto.randomBytes(32).toString('base64');

// Enable CORS for all routes
app.use(cors());

// Configure session middleware
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// file for open APIs, no authentication required
app.use('/pgrooms', apiRoutes);

// API THAT REQUIRE AUTHORIZATION
app.use("pgrooms/v1", apiRoutes);

module.exports = app;
