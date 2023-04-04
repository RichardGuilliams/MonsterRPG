const mongoose = require('mongoose');
const AppError = require('../../utils/appError')
const ModelValidator = require('../../utils/modelValidator')
const validator = require('validator');

const monsterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, 'a monsters name must be unique'],
            required: [true, 'A monster must have a name']
        },
        tamerTypes: {
            type: [String],
            required: [true, 'A monster must have at least one class that can tame it'],
            enum: {
                values:['None', 'Geomancer', 'Beastmaster', 'Rogue', 'Mage', 'Psychic'],
                message: 'Tamer Types for monsters can only be Geomancer, Beastmaster, Rogue, Mage or Psychic'
            },
            validation: [ModelValidator.limitArray(1, 2), 'A monster needs at least one tamer type but cannot have more than 2']
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
        photo: {
            type: String,
            required: [true, 'A monster must have an image']
        },
        stats: {
            type: Object
        },
        fusionMonsters: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            validate: [ModelValidator.limitArray(0, 5), 'monster cant have more than 5 fusion monsters']
        },
        attributes: {
            type: [String],
            validate: [ModelValidator.limitArray(0, 2), 'monster cant have more than 4 attributes'],
            enum: {
                values:['None', 'Fire', 'Water', 'Ice', 'Electric', 'Air', 'Light', 'Dark', 'Earth', 'Poison', 'Physical'],
                message: 'An attribute can only be Fire, Water, Ice, Electric, Air, Earth, Light, Dark, Poison and Physical'
            }
        },
        types: {
            type: [String],
            validate: [ModelValidator.limitArray(1, 2), 'A monster must have at least 1 but no more than 2 types'],
            enum: {
                values:['None', 'Avian', 'Beast', 'Elemental', 'Serpent', 'Brood', 'Divine', 'Daemon', 'Fae', 'Necro', 'Plant'],
                message: 'A monster type can only be Avian, Beast, Elemental, Serpent, Brood, Divine, Daemon, Fae, Necro ot Plant'
            }
        }
    }
)   

monsterSchema.pre(/^find/, function(next){
    this.populate({
        path: 'fusionMonsters',
        select: 'name attributes photo'
    })
    next();
})

const Monster = mongoose.model('Monster', monsterSchema);

module.exports = Monster;