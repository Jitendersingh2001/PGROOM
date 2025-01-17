const express = require('express');
const cors = require('cors'); // Import the CORS package
const app = express();
const apiRoutes = require('./routes/api.js');

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// file for open api's mean don't need any authentication
app.use('/pgrooms', apiRoutes);

module.exports = app;
