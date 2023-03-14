const GameBuilding = require('../../models/game/gameBuildingModel');
const Building = require('../../models/data/buildingModel');
const catchAsync = require('../../utils/catchAsync');
const GameFeatures = require('../../utils/gameFeatures');
const factory = require('./../handlerFactory');

exports.createGameBuilding = catchAsync(async(req, res, next) => {
    const referencedBuilding = await Building.findById(req.body.building);

    // clean, validate and manipulate Building Data for game use
    let building = {}
    
    building = await GameBuilding.create(building);

    res.status(200).json({
        status: 'success',
        building
    })
})

exports.getGameBuilding = factory.getOne(GameBuilding);
exports.getAllGameBuildings = factory.getAll(GameBuilding);
exports.updateGameBuilding = factory.updateOne(GameBuilding);
exports.deleteGameBuilding = factory.deleteOne(GameBuilding);