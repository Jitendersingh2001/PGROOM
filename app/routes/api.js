const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/states', apiController.getStates);
router.get('/cities/:id', apiController.getCities);

module.exports = router;
