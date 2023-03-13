const GameMonster = require('../../models/monster/gameMonsterModel');
const Monster = require('../../models/monster/monsterModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('./../handlerFactory');

exports.createGameMonster = catchAsync(async(req, res, next) => {
    console.log('hi')
    const monster = {
        owner: req.user.id,
        monster: await Monster.findById(req.body.monster),
        nickname: req.body.nickname,
        hpGrowth: req.body.hpGrowth,
        mpGrowth: req.body.mpGrowth,
        strGrowth: req.body.strGrowth,
        defGrowth: req.body.defGrowth,
        spdGrowth: req.body.spdGrowth,
        aglGrowth: req.body.aglGrowth,
        mgkGrowth: req.body.mgkGrowth,
        sprtGrowth: req.body.sprtGrowth,
        critRateGrowth: req.body.critRateGrowth,
        critDmgGrowth: req.body.critDmgGrowth
    }
    
    newMonster = await GameMonster.create(monster);

    res.status(200).json({
        status: 'success',
        newMonster
    })
})

exports.getGameMonster = factory.getOne(GameMonster);
exports.getAllGameMonsters = factory.getAll(GameMonster);
exports.updateGameMonster = factory.updateOne(GameMonster);
exports.deleteGameMonster = factory.deleteOne(GameMonster);