const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const validators = require("../validators/index");
const validateRequest = require("../middleware/validationMiddleware");
const {
  uploadImages,
  validateFileUpload,
} = require("../middleware/multerMiddleware");

// const uploadImages = upload.array("images", 10);

/**
 * Property Routes
 */
router
  .route("/property")
  .post(
    uploadImages,
    validateFileUpload,
    validateRequest(validators.propertyValidator),
    controller.propertyController.addProperty
  )
  .put(
    uploadImages,
    validateFileUpload,
    validateRequest(validators.propertyValidator),
    controller.propertyController.updateProperty
  );

router
  .route("/property/:id")
  .get(controller.propertyController.getProperty)
  .delete(controller.propertyController.deleteProperty);

router.post("/properties", controller.propertyController.getAllProperties);

router.put(
  "/propertyStatus",
  validateRequest(validators.propertyStatusValidator),
  controller.propertyController.updatePropertyStatus
);

/**
 * ROOM ROUTES
 */

router
  .route("/room")
  .post(
    uploadImages,
    validateFileUpload,
    validateRequest(validators.roomValidator),
    controller.roomController.addRoom
  )
  .put(
    uploadImages,
    validateFileUpload,
    validateRequest(validators.roomValidator),
    controller.roomController.updateRoom
  );

/**
 * Image Routes
 */
router.post(
  "/uploadImage",
  uploadImages,
  controller.imageController.uploadImage
);

module.exports = router;
