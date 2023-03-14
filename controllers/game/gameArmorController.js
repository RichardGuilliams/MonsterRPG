const GameArmor = require('../../models/game/gameArmorModel');
const Armor = require('../../models/data/armorModel');
const catchAsync = require('../../utils/catchAsync');
const GameFeatures = require('../../utils/gameFeatures');
const factory = require('./../handlerFactory');

exports.createGameArmor = catchAsync(async(req, res, next) => {
    const referencedArmor = await Armor.findById(req.body.armor);

    // clean, validate and manipulate Armor Data for game use
    let armor = {}
    
    armor = await GameArmor.create(armor);

    res.status(200).json({
        status: 'success',
        armor
    })
})

exports.getGameArmor = factory.getOne(GameArmor);
exports.getAllGameArmors = factory.getAll(GameArmor);
exports.updateGameArmor = factory.updateOne(GameArmor);
exports.deleteGameArmor = factory.deleteOne(GameArmor);