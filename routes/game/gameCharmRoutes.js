const express = require('express');
const gameCharmController = require('../../controllers/game/gameCharmController');
const authController = require('../../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(gameCharmController.getAllGameCharms)
    .post(authController.restrictTo('admin'), gameCharmController.createGameCharm)
;

router
    .route(`/:id`)
    .get(gameCharmController.getGameCharm)
    .delete(authController.restrictTo('admin'), gameCharmController.deleteGameCharm)
    .patch(authController.restrictTo('admin'), gameCharmController.updateGameCharm)
;   

module.exports = router;