const express = require('express');
const allianceController = require('./../controllers/allianceController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(allianceController.getAllAlliances)
    .post(authController.restrictTo('admin'), allianceController.createAlliance)
;

router
    .route(`/:id`)
    .get(allianceController.getAlliance)
    .delete(authController.restrictTo('admin'), allianceController.deleteAlliance)
    .patch(authController.restrictTo('admin'), allianceController.updateAlliance)
;   

module.exports = router;