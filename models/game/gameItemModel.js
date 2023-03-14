const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const gameItemSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'Player'
        }
    }
);

gameItemSchema.pre(/^find/, function(next){
    ModelValidator.populate(this, 'owner', 'name', next);
})

const GameItem = mongoose.model('GameItem', gameItemSchema);

module.exports = GameItem;