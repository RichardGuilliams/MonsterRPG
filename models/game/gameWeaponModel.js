const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const gameWeaponSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'Player'
        }
    }
);

gameWeaponSchema.pre(/^find/, function(next){
    ModelValidator.populate(this, 'owner', 'name', next);
})

const GameWeapon = mongoose.model('GameWeapon', gameWeaponSchema);

module.exports = GameWeapon;