const express = require('express');
const gameMonsterController = require('./../controllers/game/gameMonsterController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(gameMonsterController.getAllGameMonsters)
    .post(authController.protect, authController.restrictTo('user', 'subscriber', 'moderator', 'admin'), gameMonsterController.createGameMonster)
;

router
    .route(`/:id`)
    .get(gameMonsterController.getGameMonster)
    .delete(authController.restrictTo('user', 'subscriber', 'moderator', 'admin'), gameMonsterController.deleteGameMonster)
    .patch(authController.restrictTo('user', 'subscriber', 'moderator', 'admin'), gameMonsterController.updateGameMonster)
;      

module.exports = router;