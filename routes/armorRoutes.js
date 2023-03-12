const express = require('express');
const armorController = require('./../controllers/armorController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(armorController.getAllArmors)
    .post(authController.restrictTo('admin'), armorController.createArmor)
;

router
    .route(`/:id`)
    .get(armorController.getArmor)
    .delete(authController.restrictTo('admin'), armorController.deleteArmor)
    .patch(authController.restrictTo('admin'), armorController.updateArmor)
;   

module.exports = router;