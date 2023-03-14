const GameCollar = require('../../models/game/gameCollarModel');
const Collar = require('../../models/data/collarModel');
const catchAsync = require('../../utils/catchAsync');
const GameFeatures = require('../../utils/gameFeatures');
const factory = require('./../handlerFactory');

exports.createGameCollar = catchAsync(async(req, res, next) => {
    const referencedCollar = await Collar.findById(req.body.collar);

    // clean, validate and manipulate Collar Data for game use
    let collar = {}
    
    collar = await GameCollar.create(collar);

    res.status(200).json({
        status: 'success',
        collar
    })
})

exports.getGameCollar = factory.getOne(GameCollar);
exports.getAllGameCollars = factory.getAll(GameCollar);
exports.updateGameCollar = factory.updateOne(GameCollar);
exports.deleteGameCollar = factory.deleteOne(GameCollar);