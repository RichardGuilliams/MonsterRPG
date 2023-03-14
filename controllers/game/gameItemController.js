const GameItem = require('../../models/game/gameItemModel');
const Item = require('../../models/data/itemModel');
const catchAsync = require('../../utils/catchAsync');
const GameFeatures = require('../../utils/gameFeatures');
const factory = require('./../handlerFactory');

exports.createGameItem = catchAsync(async(req, res, next) => {
    const referencedItem = await Item.findById(req.body.item);

    // clean, validate and manipulate Item Data for game use
    let item = {}
    
    item = await GameItem.create(item);

    res.status(200).json({
        status: 'success',
        item
    })
})

exports.getGameItem = factory.getOne(GameItem);
exports.getAllGameItems = factory.getAll(GameItem);
exports.updateGameItem = factory.updateOne(GameItem);
exports.deleteGameItem = factory.deleteOne(GameItem);