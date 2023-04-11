const express = require("express");
const collarController = require("../../controllers/data/collarController");
const authController = require("../../controllers/authController");
const photoController = require("../../controllers/photoController");


const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(collarController.getAllCollars)
  .post(authController.restrictTo("admin"),
    photoController.uploadPhoto,
    photoController.resizePhoto("collar"), 
    collarController.createCollar);

router
  .route(`/:id`)
  .get(collarController.getCollar)
  .delete(authController.restrictTo("admin"), collarController.deleteCollar)
  .patch(authController.restrictTo("admin"), collarController.updateCollar);

module.exports = router;
