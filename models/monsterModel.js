const mongoose = require('mongoose');
const AppError = require('../utils/appError')
const validator = require('validator');

const monsterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A monster must have a name'],
            unique: [true, 'Please do not use duplicate monster names']
        },
        tamerType: {
            type: [String],
            required: [true, 'A monster must have at least one class that can tame it'],
            enum: {
                values:['Geomancer', 'Beastmaster', 'Rogue', 'Mage', 'Blademaster'],
                message: 'Tamer Types for monsters can only be Geomancer, Beastmaster, Rogue, Mage or Blademaster'
            }
        },
        rank: {
            type: String,
            default: 'Pawn',
            enum: {
                values: ['Pawn', 'Knight', 'Champion', 'Master'],
                message: ['A monsters rank can only be Pawn, Knight, Champion, or Master']
            }
        },
        desc: {
            type: String,
            required: [true, 'A monster must have a description']
        },
        imgUrl: {
            type: String,
            required: [true, 'A monster must have an image']
        },
        stats: {
            type: Object
        },
        canBreed: {
            type: Boolean,
            default: true
        },
        canFuse: {
            type: Boolean,
            default: false,
        },
        fusionMonsters: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            validate: [limitArray(5), 'monster cant have more than 5 fusion monsters']
        },
        weaknesses: {
            type: [String],
            validate: [limitArray(4), 'monster cant have more than 4 weaknesses'],
            enum: {
                values:['Fire', 'Water', 'Ice', 'Electric', 'Air', 'Holy', 'Unholy', 'Earth', 'Poison', 'Physical'],
                message: 'A weakness can only be Fire, Water, Ice, Electric, Air, Earth, Holy, Unholy, Poison and Physical'
            }
        },
        attributes: {
            type: [String],
            validate: [limitArray(4), 'monster cant have more than 4 attributes'],
            enum: {
                values:['Fire', 'Water', 'Ice', 'Electric', 'Air', 'Holy', 'Unholy', 'Earth', 'Poison', 'Physical'],
                message: 'An attribute can only be Fire, Water, Ice, Electric, Air, Earth, Holy, Unholy, Poison and Physical'
            }
        },
        types: {
            type: [String],
            validate: [limitArray(2), 'monster cant have more than 2 types'],
            enum: {
                values:['Avian', 'Beast', 'Elemental', 'Serpent', 'Brood', 'Divine', 'Daemon', 'Fae', 'Necro', 'Plant'],
                message: 'A monster type can only be Avian, Beast, Elemental, Serpent, Brood, Divine, Daemon, Fae, Necro ot Plant'
            }
        },
        moveTypes: {
            type: [String],
            validate: [limitArray(4), 'monster cant have more than 4 move types'],
            enum: {
                values:['Fire', 'Water', 'Ice', 'Electric', 'Air', 'Holy', 'Unholy', 'Earth', 'Poison', 'Physical'],
                message: 'An attribute can only be Fire, Water, Ice, Electric, Air, Earth, Holy, Unholy, Poison and Physical'
            }
        },
        passiveAbilities: {
            type: [mongoose.Schema.ObjectId],
            validate: [limitArray(2), 'monster cant have more than 2 passive abilities']
        }
    }
)

function limitArray(limit){
    return function(value){
        console.log(value, limit)
        return value.length <= limit;
    }
}
    

monsterSchema.pre(/^find/, function(next){
    this.populate({
        path: 'fusionMonsters',
        select: 'name attributes'
    })

    next();
})

const Monster = mongoose.model('Monster', monsterSchema);

module.exports = Monster;