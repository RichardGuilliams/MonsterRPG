const express = require('express');
const playerController = require('../../controllers/player/playerController');
const authController = require('../../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(playerController.getAllPlayers)
    .post(playerController.createPlayer)
;

router
    .route(`/:id`)
    .get(playerController.getPlayer)
    .delete(playerController.deletePlayer)
    .patch(playerController.updatePlayer)
;   

module.exports = router;