const express = require("express");
const buildingController = require("../../controllers/data/buildingController");
const authController = require("../../controllers/authController");
const photoController = require("../../controllers/photoController");


const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(buildingController.getAllBuildings)
  .post(authController.restrictTo("admin"),
    photoController.uploadPhoto,
    photoController.resizePhoto("building"),
    buildingController.createBuilding);

router
  .route(`/:id`)
  .get(buildingController.getBuilding)
  .delete(authController.restrictTo("admin"), buildingController.deleteBuilding)
  .patch(authController.restrictTo("admin"), buildingController.updateBuilding);

module.exports = router;
