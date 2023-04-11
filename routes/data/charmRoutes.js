const express = require("express");
const charmController = require("../../controllers/data/charmController");
const authController = require("../../controllers/authController");
const photoController = require("../../controllers/photoController");


const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(charmController.getAllCharms)
  .post(authController.restrictTo("admin"),
    photoController.uploadPhoto,
    photoController.resizePhoto("charm"),
    charmController.createCharm);

router
  .route(`/:id`)
  .get(charmController.getCharm)
  .delete(authController.restrictTo("admin"), charmController.deleteCharm)
  .patch(authController.restrictTo("admin"), charmController.updateCharm);

module.exports = router;
