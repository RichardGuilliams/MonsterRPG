const express = require('express');
const monsterController = require('./../controllers/monsterController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(monsterController.getAllMonsters)
    .post(authController.restrictTo('admin'), monsterController.createMonster)
;

router
    .route(`/:id`)
    .get(monsterController.getMonster)
    .delete(authController.restrictTo('admin'), monsterController.deleteMonster)
    .patch(authController.restrictTo('admin'), monsterController.updateMonster)
;   

module.exports = router;