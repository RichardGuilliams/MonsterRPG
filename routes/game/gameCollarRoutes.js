const express = require('express');
const gameCollarController = require('../../controllers/game/gameCollarController');
const authController = require('../../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(gameCollarController.getAllGameCollars)
    .post(authController.restrictTo('admin'), gameCollarController.createGameCollar)
;

router
    .route(`/:id`)
    .get(gameCollarController.getGameCollar)
    .delete(authController.restrictTo('admin'), gameCollarController.deleteGameCollar)
    .patch(authController.restrictTo('admin'), gameCollarController.updateGameCollar)
;   

module.exports = router;