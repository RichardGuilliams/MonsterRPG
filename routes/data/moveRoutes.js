const express = require("express");
const moveController = require("../../controllers/data/moveController");
const photoController = require("../../controllers/photoController");
const authController = require("../../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(moveController.getAllMoves)
  .post(
    authController.restrictTo("admin"),
    photoController.uploadPhoto,
    photoController.resizePhoto("move"),
    moveController.createMove
  );

router
  .route(`/:id`)
  .get(moveController.getMove)
  .delete(authController.restrictTo("admin"), moveController.deleteMove)
  .patch(authController.restrictTo("admin"), moveController.updateMove);

module.exports = router;
