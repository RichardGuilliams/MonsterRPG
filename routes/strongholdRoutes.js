const express = require('express');
const strongholdController = require('./../controllers/strongholdController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(strongholdController.getAllStrongholds)
    .post(authController.restrictTo('admin'), strongholdController.createStronghold)
;

router
    .route(`/:id`)
    .get(strongholdController.getStronghold)
    .delete(authController.restrictTo('admin'), strongholdController.deleteStronghold)
    .patch(authController.restrictTo('admin'), strongholdController.updateStronghold)
;   

module.exports = router;