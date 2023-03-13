const express = require('express');
const monsterCollectionController = require('./../controllers/game/MonsterCollectionController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(monsterCollectionController.getAllMonsterCollections)
    .post(authController.restrictTo('admin'), monsterCollectionController.createMonsterCollection)
;

router
    .route(`/:id`)
    .get(monsterCollectionController.getMonsterCollection)
    .delete(authController.restrictTo('admin'), monsterCollectionController.deleteMonsterCollection)
    .patch(authController.restrictTo('admin'), monsterCollectionController.updateMonsterCollection)
;   

module.exports = router;