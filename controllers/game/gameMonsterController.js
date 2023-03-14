const GameMonster = require('../../models/game/gameMonsterModel');
const Monster = require('../../models/data/monsterModel');
const catchAsync = require('../../utils/catchAsync');
const GameFeatures = require('../../utils/gameFeatures');
const factory = require('./../handlerFactory');

exports.createGameMonster = catchAsync(async(req, res, next) => {
    const referencedMonster = await Monster.findById(req.body.monster);

    let monster = {
        owner: req.user.id,
        monster: referencedMonster,
        nickname: req.body.nickname,
        stats: {
            hp: GameFeatures.randomize(req.body.hpGrowth, referencedMonster.stats.hp),
            mp: GameFeatures.randomize(req.body.mpGrowth, referencedMonster.stats.mp),
            str: GameFeatures.randomize(req.body.strGrowth,  referencedMonster.stats.str),
            def: GameFeatures.randomize(req.body.defGrowth,  referencedMonster.stats.def),
            spd: GameFeatures.randomize(req.body.spdGrowth,  referencedMonster.stats.spd),
            agl: GameFeatures.randomize(req.body.aglGrowth,  referencedMonster.stats.agl),
            mgk: GameFeatures.randomize(req.body.mgkGrowth,  referencedMonster.stats.mgk),
            sprt: GameFeatures.randomize(req.body.sprtGrowth,  referencedMonster.stats.sprt),
            critRate: GameFeatures.randomize(req.body.critRateGrowth,  referencedMonster.stats.critRate),
            critDmg: GameFeatures.randomize(req.body.critDmgGrowth,  referencedMonster.stats.critDmg)
        },
        hpGrowth: GameFeatures.randomize(req.body.hpGrowth, referencedMonster.stats.hp),
        mpGrowth: GameFeatures.randomize(req.body.mpGrowth, referencedMonster.stats.mp),
        strGrowth: GameFeatures.randomize(req.body.strGrowth,  referencedMonster.stats.str),
        defGrowth: GameFeatures.randomize(req.body.defGrowth,  referencedMonster.stats.def),
        spdGrowth: GameFeatures.randomize(req.body.spdGrowth,  referencedMonster.stats.spd),
        aglGrowth: GameFeatures.randomize(req.body.aglGrowth,  referencedMonster.stats.agl),
        mgkGrowth: GameFeatures.randomize(req.body.mgkGrowth,  referencedMonster.stats.mgk),
        sprtGrowth: GameFeatures.randomize(req.body.sprtGrowth,  referencedMonster.stats.sprt),
        critRateGrowth: GameFeatures.randomize(req.body.critRateGrowth,  5),
        critDmgGrowth: GameFeatures.randomize(req.body.critDmgGrowth,  5)
    }
    
    monster = await GameMonster.create(monster);

    res.status(200).json({
        status: 'success',
        monster
    })
})

exports.getGameMonster = factory.getOne(GameMonster);
exports.getAllGameMonsters = factory.getAll(GameMonster);
exports.updateGameMonster = factory.updateOne(GameMonster);
exports.deleteGameMonster = factory.deleteOne(GameMonster);