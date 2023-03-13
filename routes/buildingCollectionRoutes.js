const express = require('express');
const buildingCollectionController = require('./../controllers/game/buildingCollectionController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route(`/`)
    .get(buildingCollectionController.getAllBuildingCollections)
    .post(authController.restrictTo('admin'), buildingCollectionController.createBuildingCollection)
;

router
    .route(`/:id`)
    .get(buildingCollectionController.getBuildingCollection)
    .delete(authController.restrictTo('admin'), buildingCollectionController.deleteBuildingCollection)
    .patch(authController.restrictTo('admin'), buildingCollectionController.updateBuildingCollection)
;   

module.exports = router;