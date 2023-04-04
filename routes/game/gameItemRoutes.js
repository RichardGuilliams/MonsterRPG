const express = require("express");
const gameItemController = require("../../controllers/game/gameItemController");
const authController = require("../../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(gameItemController.getAllGameItems)
  .post(authController.restrictTo("admin"), gameItemController.createGameItem);

router
  .route(`/:id`)
  .get(gameItemController.getGameItem)
  .delete(authController.restrictTo("admin"), gameItemController.deleteGameItem)
  .patch(authController.restrictTo("admin"), gameItemController.updateGameItem);

module.exports = router;
