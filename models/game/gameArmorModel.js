const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const gameArmorSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'Player'
        }
    }
);

gameArmorSchema.pre(/^find/, function(next){
    ModelValidator.populate(this, 'owner', 'name', next);
})

const GameArmor = mongoose.model('GameArmor', gameArmorSchema);

module.exports = GameArmor;