const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'An weapon must have a name']
        },
        photo: {
            type: String,
            required: [true, 'An weapon must have an image']
        },
        desc: {
            type: String,
            required: [true, 'A weapon must have a description']
        }
    }
)

const Weapon = mongoose.model('Weapon', weaponSchema);

module.exports = Weapon;
