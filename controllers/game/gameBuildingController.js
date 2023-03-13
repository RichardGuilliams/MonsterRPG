const GameBuilding = require('../../models/building/gameBuildingModel');
const Building = require('../../models/building/buildingModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const GameFeatures = require('../../utils/gameFeatures');
const factory = require('./../handlerFactory');

exports.getGameBuilding = factory.getOne(GameBuilding);
exports.getAllGameBuildings = factory.getAll(GameBuilding);
exports.createGameBuilding = factory.createOne(GameBuilding);
exports.updateGameBuilding = factory.updateOne(GameBuilding);
exports.deleteGameBuilding = factory.deleteOne(GameBuilding);