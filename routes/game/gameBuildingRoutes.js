const express = require('express');
const gameBuildingController = require('../../controllers/game/gameBuildingController');
const authController = require('../../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(gameBuildingController.getAllGameBuildings)
    .post(authController.restrictTo('admin'), gameBuildingController.createGameBuilding)
;

router
    .route(`/:id`)
    .get(gameBuildingController.getGameBuilding)
    .delete(authController.restrictTo('admin'), gameBuildingController.deleteGameBuilding)
    .patch(authController.restrictTo('admin'), gameBuildingController.updateGameBuilding)
;   

module.exports = router;