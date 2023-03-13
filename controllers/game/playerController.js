const Player = require('../../models/player/playerModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('./../handlerFactory');

exports.createPlayer = catchAsync(async(req, res, next) => {
    console.log(req.body)
})

exports.getPlayer = factory.getOne(Player);
exports.getAllPlayers = factory.getAll(Player);
exports.createPlayer = factory.createOne(Player);
exports.updatePlayer = factory.updateOne(Player);
exports.deletePlayer = factory.deleteOne(Player);