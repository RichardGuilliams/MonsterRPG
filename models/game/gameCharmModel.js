const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const gameCharmSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'Player'
        }
    }
);

gameCharmSchema.pre(/^find/, function(next){
    ModelValidator.populate(this, 'owner', 'name', next);
})

const GameCharm = mongoose.model('GameCharm', gameCharmSchema);

module.exports = GameCharm;