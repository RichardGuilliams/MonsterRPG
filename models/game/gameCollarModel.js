const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const gameCollarSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'Player'
        }
    }
);

gameCollarSchema.pre(/^find/, function(next){
    ModelValidator.populate(this, 'owner', 'name', next);
})

const GameCollar = mongoose.model('GameCollar', gameCollarSchema);

module.exports = GameCollar;