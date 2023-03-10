const express = require('express');
const charmController = require('./../controllers/charmController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(charmController.getAllCharms)
    .post(authController.restrictTo('admin'), charmController.createCharm)
;

router
    .route(`/:id`)
    .get(charmController.getCharm)
    .delete(authController.restrictTo('admin'), charmController.deleteCharm)
    .patch(authController.restrictTo('admin'), charmController.updateCharm)
;   

module.exports = router;