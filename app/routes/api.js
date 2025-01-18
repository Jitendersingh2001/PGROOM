const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const profileController = require('../controllers/profileController');

router.get('/states', apiController.getStates);
router.get('/cities/:id', apiController.getCities);
router.post('/login', profileController.login);
router.post('/register', profileController.createAccount);

module.exports = router;
