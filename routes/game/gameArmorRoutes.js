const express = require("express");
const gameArmorController = require("../../controllers/game/gameArmorController");
const authController = require("../../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(gameArmorController.getAllGameArmors)
  .post(
    authController.restrictTo("admin"),
    gameArmorController.createGameArmor
  );

router
  .route(`/:id`)
  .get(gameArmorController.getGameArmor)
  .delete(
    authController.restrictTo("admin"),
    gameArmorController.deleteGameArmor
  )
  .patch(
    authController.restrictTo("admin"),
    gameArmorController.updateGameArmor
  );

module.exports = router;
