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

router.put('/property',
  upload.array("images", 10),
  validateRequest(validators.propertyValidator),
  propertyController.updateProperty
);

router.delete('/property/:id',
  propertyController.deleteProperty
);

router.post(
  '/uploadImage',
  upload.array("images", 10),
  imageController.uploadImage
);

module.exports = router;