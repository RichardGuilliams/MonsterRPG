const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const gameBuildingSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'Player'
        },
        lvl: {
            type: Number,
            default: 1,
            min: process.env.GAME_BUILDINGLVL_MIN,
            max: process.env.GAME_BUILDINGLVL_MAX
        },
        leader: {
            type: mongoose.Schema.ObjectId,
            ref: 'GameMonster'
        }
    }
);

gameBuildingSchema.pre(/^find/, function(next){
    if(this.owner == null) next();
    this.populate({
        path: 'leader'
    })

    next();
})

gameBuildingSchema.pre(/^find/, function(next){
    ModelValidator.populate.bind(gameBuildingSchema, 'owner', '');
    // if(this.owner == null) next();
    // this.populate({
    //     path: 'owner'
    // })

    next();
})

const GameBuilding = mongoose.model('GameBuilding', gameBuildingSchema);

module.exports = GameBuilding;