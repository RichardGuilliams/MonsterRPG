const express = require("express");
const gameWeaponController = require("../../controllers/game/gameWeaponController");
const authController = require("../../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(gameWeaponController.getAllGameWeapons)
  .post(
    authController.restrictTo("admin"),
    gameWeaponController.createGameWeapon
  );

router
  .route(`/:id`)
  .get(gameWeaponController.getGameWeapon)
  .delete(
    authController.restrictTo("admin"),
    gameWeaponController.deleteGameWeapon
  )
  .patch(
    authController.restrictTo("admin"),
    gameWeaponController.updateGameWeapon
  );

module.exports = router;
