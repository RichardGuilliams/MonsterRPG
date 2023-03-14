const GameCharm = require('../../models/game/gameCharmModel');
const Charm = require('../../models/data/charmModel');
const catchAsync = require('../../utils/catchAsync');
const GameFeatures = require('../../utils/gameFeatures');
const factory = require('./../handlerFactory');

exports.createGameCharm = catchAsync(async(req, res, next) => {
    const referencedCharm = await Charm.findById(req.body.charm);

    // clean, validate and manipulate Charm Data for game use
    let charm = {}
    
    charm = await GameCharm.create(charm);

    res.status(200).json({
        status: 'success',
        charm
    })
})

exports.getGameCharm = factory.getOne(GameCharm);
exports.getAllGameCharms = factory.getAll(GameCharm);
exports.updateGameCharm = factory.updateOne(GameCharm);
exports.deleteGameCharm = factory.deleteOne(GameCharm);