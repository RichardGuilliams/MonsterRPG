const GameWeapon = require('../../models/game/gameWeaponModel');
const Weapon = require('../../models/data/weaponModel');
const catchAsync = require('../../utils/catchAsync');
const GameFeatures = require('../../utils/gameFeatures');
const factory = require('./../handlerFactory');

exports.createGameWeapon = catchAsync(async(req, res, next) => {
    const referencedWeapon = await Weapon.findById(req.body.weapon);

    // clean, validate and manipulate Weapon Data for game use
    let weapon = {}
    
    weapon = await GameWeapon.create(weapon);

    res.status(200).json({
        status: 'success',
        weapon
    })
})

exports.getGameWeapon = factory.getOne(GameWeapon);
exports.getAllGameWeapons = factory.getAll(GameWeapon);
exports.updateGameWeapon = factory.updateOne(GameWeapon);
exports.deleteGameWeapon = factory.deleteOne(GameWeapon);