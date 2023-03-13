const BuildingCollection = require('../../models/player/BuildingCollectionModel');
const Building = require('../../models/building/buildingModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const GameFeatures = require('../../utils/gameFeatures');
const factory = require('./../handlerFactory');

exports.getBuildingCollection = factory.getOne(BuildingCollection);
exports.getAllBuildingCollections = factory.getAll(BuildingCollection);
exports.createBuildingCollection = factory.createOne(BuildingCollection);
exports.updateBuildingCollection = factory.updateOne(BuildingCollection);
exports.deleteBuildingCollection = factory.deleteOne(BuildingCollection);