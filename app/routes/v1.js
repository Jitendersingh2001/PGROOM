const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const validators = require("../validators/index");
const validateRequest = require("../middleware/ValidationMiddleware");
const {
  uploadImages,
  validateFileUpload,
} = require("../middleware/MulterMiddleware");

/**
 * Property Routes
 */
router
  .route("/property")
  .post(
    uploadImages,
    validateFileUpload,
    validateRequest(validators.propertyValidator),
    controller.PropertyController.addProperty
  )
  .put(
    uploadImages,
    validateFileUpload,
    validateRequest(validators.propertyValidator),
    controller.PropertyController.updateProperty
  );

router
  .route("/property/:id")
  .get(controller.PropertyController.getProperty)
  .delete(controller.PropertyController.deleteProperty);

router.post("/properties", controller.PropertyController.getAllProperties);

router.put(
  "/propertyStatus",
  validateRequest(validators.propertyStatusValidator),
  controller.PropertyController.updatePropertyStatus
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
    controller.RoomController.addRoom
  )
  .put(
    uploadImages,
    validateFileUpload,
    validateRequest(validators.roomValidator),
    controller.RoomController.updateRoom
  );

router.post("/rooms", controller.RoomController.getAllRooms);

router
  .route("/room/:id")
  .get(controller.RoomController.getRoom)
  .delete(controller.RoomController.deleteRoom);

/**
 * USER ROUTES
 */
router.get("/getTenants", controller.UserController.getTenants);

/**
 * TENANT ROUTES
 */
router
  .route("/tenant")
  .post(
    validateRequest(validators.tenantValidator),
    controller.TenantController.createTenant
  )
  .put(
    validateRequest(validators.tenantValidator),
    controller.TenantController.updateTenant
  );

module.exports = router;
