const express = require("express");
const armorController = require("../../controllers/data/armorController");
const authController = require("../../controllers/authController");
const photoController = require("../../controllers/photoController");


const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(armorController.getAllArmors)
  .post(authController.restrictTo("admin"),
    photoController.uploadPhoto,
    photoController.resizePhoto("armor"),
    armorController.createArmor);

router
  .route(`/:id`)
  .get(armorController.getArmor)
  .delete(authController.restrictTo("admin"), armorController.deleteArmor)
  .patch(authController.restrictTo("admin"), armorController.updateArmor);

module.exports = router;
