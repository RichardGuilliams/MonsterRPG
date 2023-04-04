const express = require('express');
const monsterController = require('../../controllers/data/monsterController');
const photoController = require('../../controllers/photoController');
const authController = require('../../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(monsterController.getAllMonsters)
    .post(authController.restrictTo('admin'),
        photoController.uploadPhoto, 
        photoController.resizePhoto('monster'), 
        monsterController.createMonster)
;

router
    .route(`/:id`)
    .get(monsterController.getMonster)
    .delete(authController.restrictTo('admin'), monsterController.deleteMonster)
    .patch(authController.restrictTo('admin'), monsterController.updateMonster)
;   

module.exports = router;