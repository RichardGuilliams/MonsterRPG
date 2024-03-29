const express = require("express");
const weaponController = require("../../controllers/data/weaponController");
const authController = require("../../controllers/authController");
const photoController = require("../../controllers/photoController");


const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(weaponController.getAllWeapons)
  .post(authController.restrictTo("admin"),
    photoController.uploadPhoto,
    photoController.resizePhoto("weapon"),
    weaponController.createWeapon);

router
  .route(`/:id`)
  .get(weaponController.getWeapon)
  .delete(authController.restrictTo("admin"), weaponController.deleteWeapon)
  .patch(authController.restrictTo("admin"), weaponController.updateWeapon);

module.exports = router;
