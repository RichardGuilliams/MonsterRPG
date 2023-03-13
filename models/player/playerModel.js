const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A player must have a name'],
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
            ref: 'MonsterCollection',
            default: null
        },
        buildings: {
            type: [mongoose.Schema.ObjectId],
            ref: 'BuildingCollection',
            default: null
        }
    }
)

playerSchema.pre(/^find/, function(next){
    if(this.alliance == null) next();
    this.populate({
        path: 'alliance'
    })
})

playerSchema.pre(/^find/, function(next){
    if(this.monsters == null) next();
    this.populate({
        path: 'monsters'
    })
})

playerSchema.pre(/^find/, function(next){
    if(this.buildings == null) next();
    this.populate({
        path: 'buildings'
    })
})

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
