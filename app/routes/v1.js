const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

/**
 * Property routes
 */
 router.post('/addproperty', propertyController.addProperty);
  
  router.get('/getproperty', (req, res) => {
    res.send('Get property');
  });
  
  router.put('/updateproperty', (req, res) => {
    res.send('Update property');
  });
  
  router.delete('/deleteproperty', (req, res) => {
    res.send('Delete property');
  });

module.exports = router;
