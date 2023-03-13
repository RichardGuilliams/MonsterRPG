var mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');
var validator = require('validator');

const gameMonsterSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'Player'
        },
        monster: {
            type: Object
        },
        nickname: {
            type: String
        },
        lvl: {
            type: Number,
            min: process.env.GAME_MONSTERLVL_MIN,
            default: 1
        },
        exp: {
            type: Number,
            default: 0
        },
        expToNext: {
            type: Number
        },
        stats: {
            type: Object
        },
        hpGrowth: {
            type: Number,
            min: process.env.GAME_STATGROWTH_GRAND_MIN,
            default: 0
        },
        mpGrowth: {
            type: Number,
            min: process.env.GAME_STATGROWTH_GRAND_MIN,
            default: 0
        }
        ,
        strGrowth: {
            type: Number,
            min: process.env.GAME_STATGROWTH_MAJOR_MIN,
            default: 0
        },
        defGrowth: {
            type: Number,
            min: process.env.GAME_STATGROWTH_MAJOR_MIN,
            default: 0
        },
        spdGrowth: {
            type: Number,
            min: process.env.GAME_STATGROWTH_MAJOR_MIN,
            default: 0
        },
        aglGrowth: {
            type: Number,
            min: process.env.GAME_STATGROWTH_MAJOR_MIN,
            default: 0
        },
        mgkGrowth: {
            type: Number,
            min: process.env.GAME_STATGROWTH_MAJOR_MIN,
            default: 0
        },
        sprtGrowth: {
            type: Number,
            min: process.env.GAME_STATGROWTH_MIN,
            default: 0
        },
        critDmgGrowth: {
            type: Number,
            min: process.env.GAME_STATGROWTH_MINOR_MIN,
            default: 0
        },
        critRateGrowth: {
            type: Number,
            min: process.env.GAME_STATGROWTH_MINOR_MIN,
            default: 0
        }
    }
)

gameMonsterSchema.pre(/^find/, function(next){
    this.populate({
        path: 'owner',
        select: 'name'
    })

    next();
})

const GameMonster = mongoose.model('GameMonster', gameMonsterSchema);

module.exports = GameMonster;
