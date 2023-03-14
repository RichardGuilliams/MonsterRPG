const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator')

const playerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A player must have a name'],
            unique: [true, 'A players name must be unique'],
            min: [3, 'A name must be at least 3 characters long'],
            max: [28, 'A name cannot be more than 28 characters long']

        },
        lvl: {
            type: Number,
            min: [1, 'A players lvl cannot be less than 1'],
            max: [100, 'A players lvl cannot be greater than 100'],
            default: 1
        },
        gold: {
            type: Number,
            default: 0,
            min: 0,
            max: 9999999999999
        },
        alliance: {
            type: mongoose.Schema.ObjectId,
            ref: 'Alliance',
            default: null
        },
        monsters: {
            type: [mongoose.Schema.ObjectId],
            ref: 'GameMonster',
            default: null,
            validate: [ModelValidator.limitArray(0, 30), 'A player cannot have more than 30 monsters']
        },
        buildings: {
            type: [mongoose.Schema.ObjectId],
            ref: 'GameBuilding',
            default: null,
            validate: [ModelValidator.limitArray(0, 10), 'A player cannot have more than 10 buildings']
        },
        items: {
            type: [mongoose.Schema.ObjectId],
            ref: 'GameItem',
            default: null,
            validate: [ModelValidator.limitArray(0, 300), 'A player cannot have more than 300 items']
        },
        weapons: {
            type: [mongoose.Schema.ObjectId],
            ref: 'GameWeapon',
            default: null,
            validate: [ModelValidator.limitArray(0, 30), 'A player cannot have more than 30 weapons']
        },
        armors: {
            type: [mongoose.Schema.ObjectId],
            ref: 'GameArmor',
            default: null,
            validate: [ModelValidator.limitArray(0, 30), 'A player cannot have more than 30 armors']
        },
        collars: {
            type: [mongoose.Schema.ObjectId],
            ref: 'GameCollar',
            default: null,
            validate: [ModelValidator.limitArray(0, 30), 'A player cannot have more than 30 collars']
        },
        charms: {
            type: [mongoose.Schema.ObjectId],
            ref: 'GameCharm',
            default: null,
            validate: [ModelValidator.limitArray(0, 300), 'A player cannot have more than 300 charms']
        }
    }
)

playerSchema.pre(/^find/, function(next){
    ModelValidator.populate(this, 'alliance', '', next);
    ModelValidator.populate(this, 'monsters', '', next);
    ModelValidator.populate(this, 'buildings', '', next);
    ModelValidator.populate(this, 'weapons', '', next);
    ModelValidator.populate(this, 'items', '', next);
    ModelValidator.populate(this, 'armors', '', next);
    ModelValidator.populate(this, 'charms', '', next);
    ModelValidator.populate(this, 'collars', '', next);
})

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
