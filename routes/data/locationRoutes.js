const express = require("express");
const locationController = require("../../controllers/data/locationController");
const authController = require("../../controllers/authController");
const photoController = require("../../controllers/photoController");



const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(locationController.getAllLocations)
  .post(authController.restrictTo("admin"),
    photoController.uploadPhoto,
    photoController.resizePhoto("location"),
    locationController.createLocation);

router
  .route(`/:id`)
  .get(locationController.getLocation)
  .delete(authController.restrictTo("admin"), locationController.deleteLocation)
  .patch(authController.restrictTo("admin"), locationController.updateLocation);

module.exports = router;
