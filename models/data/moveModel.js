const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const moveSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, 'a Move name must be unique'],
            required: [true, 'An Move must have a name']
        },
        photo: {
            type: String,
            default: 'default.jpg' 
        },
        desc: {
            type: String,
            required: [true, 'A Move must have a description']
        },
        rank: {
            type: String,
            default: 'Pawn',
            enum: {
                values: ['Pawn', 'Knight', 'Champion', 'Master'],
                message: ['A monsters rank can only be Pawn, Knight, Champion, or Master']
            },
            default: 'Pawn'
        },
        types: {
            type: [String],
            validation: [ModelValidator.limitArray(1, 2), 'A move must have at least one but no more than two types'],
            enum: {
                values: ['None', 'Avian', 'Amphian', 'Beast', 'Elemental', 'Serpent', 'Brood', 'Divine', 'Daemon', 'Fae', 'Necro', 'Plant'],
                message: 'A move type can only be: None, Avian, Amphian, Beast, Elemental, Serpent, Brood, Divine, Daemon, Fae, Necro or Plant'
            },
            default: ['None']
        },
        attributes: {
            type: [String],
            validation: [ModelValidator.limitArray(1, 2), 'A move must have at least one but no more than two attributes'],
            enum: {
                values: ['None', 'Fire', 'Water', 'Ice', 'Electric', 'Air', 'Light', 'Dark', 'Earth', 'Poison', 'Physical'],
                message: 'An attribute can only be Fire, Water, Ice, Electric, Air, Earth, Light, Dark, Poison and Physical'
            },
            default: ['None']
        },
        effect: {
            type: String,
            enum: {
                values: [
                    'None', 'Poison', 'Burn', 'Frozen', 'Stunned',
                    'Paralyzed', 'Undead', 'Immortal', 'Ethereal',
                    'KO', 'Berserk', 'Confused', 'Slow', 'Haste',
                    'Shell', 'Protect', 'Barrier', 'Float', 'Stone',
                    'Charmed'
                ],
                message: 'An attribute can only be: None, Poison, Burn, Frozen, Stunned, Paralyzed, Undead, Immortal, Ethereal, KO, Berserk, Confused, Slow, Haste, Shell, Protect, Barrier, Float, Stone or Charmed'
            },
            default: 'None'
            
        },
        target: {
            type: String,
            enum: {
                values: ['Self', 'One', 'Ally', 'All Allies', 'Enemy', 'All Enemy', 'All'],
                message: 'An attribute can only be Fire, Water, Ice, Electric, Air, Earth, Light, Dark, Poison and Physical'
            },
            default: 'Self'
        },
        power: {
            type: Number,
            min: [0, 'A moves accuracy cannot be less than 0'],
            max: [150, 'A moves accuracy cannot be greater than 150'],
            default: 10
        },
        accuracy: {
            type: Number,
            min: [0, 'A moves accuracy cannot be less than 0'],
            max: [100, 'A moves accuracy cannot be greater than 100'],
            default: 100
        },
        modifier: {
            type: String,
            enum: {
                values: ['None', 'Hp', 'Mp', 'Atk', 'Def', 'MAtk', 'MDef', 'Spd', 'Agl', 'CritDmg', 'CritRate', 'Luk', 'Acc', 'Ev'],
                message: 'A target stat must be: None, Hp, Mp, Atk, Def, MAtk, MDef, Spd, Agl, CritDmg, CritRate, Luk, Acc or Ev'
            },
            default: 'Hp'            
        },
        targetStat: {
            type: [String],
            enum: {
                values: ['None', 'Hp', 'Mp', 'Atk', 'Def', 'MAtk', 'MDef', 'Spd', 'Agl', 'CritDmg', 'CritRate', 'Luk', 'Acc', 'Ev'],
                message: 'A target stat must be: None, Hp, Mp, Atk, Def, MAtk, MDef, Spd, Agl, CritDmg, CritRate, Luk, Acc or Ev'
            },
            validation: [ModelValidator.limitArray(1, 2), 'A move must have at least one but no more than two target stats'],
            default: 'Hp'
        }
    }
)

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;
