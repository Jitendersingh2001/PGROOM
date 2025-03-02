const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const imageController = require('../controllers/imageController');
const validators = require("../validators/index");
const validateRequest = require("../middleware/validationMiddleware");
const upload = require("../middleware/multerMiddleware");

/**
 * Property routes
 */
router.post(
  '/property',
  upload.array("images", 10),
  validateRequest(validators.propertyValidator),
  propertyController.addProperty
);

router.get('/property/:id',
  propertyController.getProperty
);

router.put('/property', (req, res) => {
  res.send('Update property');
});

router.delete('/property', (req, res) => {
  res.send('Delete property');
});

router.post(
  '/uploadImage',
  upload.array("images", 10),
  imageController.uploadImage
);

module.exports = router;