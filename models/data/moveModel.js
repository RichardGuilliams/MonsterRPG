const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const moveSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, 'a Moves name must be unique'],
            required: [true, 'An Move must have a name']
        },
        photo: {
            type: String,
            required: [true, 'An Move must have an image']
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
            }
        },
        types: {
            type: [String],
            validation: [ModelValidator.limitArray(1, 2), 'A move must have at least one but no more than two types'],
            required: [true, 'A move must have a type'],
            enum: {
                values: ['None', 'Avian', 'Amphian', 'Beast', 'Elemental', 'Serpent', 'Brood', 'Divine', 'Daemon', 'Fae', 'Necro', 'Plant'],
                message: 'A move type can only be: None, Avian, Amphian, Beast, Elemental, Serpent, Brood, Divine, Daemon, Fae, Necro or Plant'
            }
        },
        attributes: {
            type: [String],
            required: [true, 'A move must have an attribute'],
            validation: [ModelValidator.limitArray(1, 2), 'A move must have at least one but no more than two attributes'],
            enum: {
                values: ['None', 'Fire', 'Water', 'Ice', 'Electric', 'Air', 'Light', 'Dark', 'Earth', 'Poison', 'Physical'],
                message: 'An attribute can only be Fire, Water, Ice, Electric, Air, Earth, Light, Dark, Poison and Physical'
            }
        },
        effect: {
            type: String,
            required: [true, 'A move must have an effect'],
            
        },
        target: {
            type: String,
            required: [true, 'A move must have a target'],
            enum: {
                values: ['Self', 'One', 'Ally', 'All Allies', 'Enemy', 'All Enemy', 'All'],
                message: 'An attribute can only be Fire, Water, Ice, Electric, Air, Earth, Light, Dark, Poison and Physical'
            }
        }
    }
)

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;
