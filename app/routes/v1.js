const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const imageController = require("../controllers/imageController");
const validators = require("../validators/index");
const validateRequest = require("../middleware/validationMiddleware");
const upload = require("../middleware/multerMiddleware");

const uploadImages = upload.array("images", 10);

/**
 * Property Routes
 */
router
  .route("/property")
  .post(
    uploadImages,
    validateRequest(validators.propertyValidator),
    propertyController.addProperty
  )
  .put(
    uploadImages,
    validateRequest(validators.propertyValidator),
    propertyController.updateProperty
  );

router
  .route("/property/:id")
  .get(propertyController.getProperty)
  .delete(propertyController.deleteProperty);

/**
 * Image Routes
 */
router.post("/uploadImage", uploadImages, imageController.uploadImage);

module.exports = router;
