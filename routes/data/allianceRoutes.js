const express = require("express");
const allianceController = require("../../controllers/game/allianceController");
const authController = require("../../controllers/authController");
const photoController = require("../../controllers/photoController");


const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(allianceController.getAllAlliances)
  .post(authController.restrictTo("admin"),
    photoController.uploadPhoto,
    photoController.resizePhoto("alliance"),
    allianceController.createAlliance);

router
  .route(`/:id`)
  .get(allianceController.getAlliance)
  .delete(authController.restrictTo("admin"), allianceController.deleteAlliance)
  .patch(authController.restrictTo("admin"), allianceController.updateAlliance);

module.exports = router;
