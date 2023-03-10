var mongoose = require('mongoose');
var validator = require('validator');

const monsterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A monster must have a name'],
            unique: [true, 'Please do not use duplicate monster names']
        },
        tamerType: {
            type: [String],
            required: [true, 'A monster must have a class that can tame it'],
            enum: {
                values:['Geomancer', 'Beastmaster', 'Rogue', 'Mage', 'Blademaster'],
                message: 'Tamer Types for monsters can only be Geomancer, Beastmaster, Rogue, Mage or Blademaster'
            }
        },
        rank: {
            type: String,
            default: 'Pawn',
            enum: {
                values: ['Pawn', 'Knight', 'Champion'],
                message: ['A monsters rank can only be Pawn, Knight and Champion']
            }
        },
        type1: {
            type: String,
            required: [true, 'A monster must have at least one type'],
            default: 'Beast',
            enum: {
                values: ['None', 'Avian', 'Beast', 'Elemental', 'Divine', 'Hive', 'Daemon', 'Fae', 'Serpent', 'Necro', 'Plant', 'Ambhian'],
                message: 'Monster types have to be either None, Avian, Beast, Elemental, Divine, Hive, Daemon, Fae, Serpent, Necro, Plant, Ambhian'
            }
        },
        type2: {
            type: String,
            default: 'None',
            enum: {
                values: ['None', 'Avian', 'Beast', 'Elemental', 'Divine', 'Hive', 'Daemon', 'Fae', 'Serpent', 'Necro', 'Plant', 'Ambhian'],
                message: 'Monster types have to be either None, Avian, Beast, Elemental, Divine, Hive, Daemon, Fae, Serpent, Necro, Plant, Ambhian'
            }
        },
        imgUrl: {
            type: String,
            required: [true, 'A monster must have an image']
        },
        lvl: {
            type: Number,
            default: 1
        },
        stats: {
            type: [Object, Object, Object, Object, Object, Object],
            values: {Number},
            length: 6,
            maxLength: 0
        },
        hp: {
            type: Number,
            default: 0
        },
        mp: {
            type: Number,
            default: 0
        },
        str: {
            type: Number,
            default: 0
        },
        def: {
            type: Number,
            default: 0
        },
        spd: {
            type: Number,
            default: 0
        },
        agl: {
            type: Number,
            default: 0
        },
        mgk: {
            type: Number,
            default: 0
        },
        sprt: {
            type: Number,
            default: 0
        },
        luk: {
            type: Number,
            default: 0
        },
        critRate: {
            type: Number,
            default: 0
        },
        critDmg: {
            type: Number,
            default: 0
        },
        canBreed: {
            type: Boolean,
            default: true
        },
        canFuse: {
            type: Boolean,
            default: false
        },
        fusionMonsters: {
            type: [mongoose.Schema.ObjectId],
        }
    }
)

const monster = mongoose.model('monster', monsterSchema);

module.exports = monster;