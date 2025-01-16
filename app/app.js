const express = require('express');
const app = express();
const apiRoutes = require('./routes/api.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// file for open api's mean don't need any authentication
app.use('/pgroomns', apiRoutes);


module.exports = app;