var mongoose = require('mongoose');
var validator = require('validator');

const weaponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'An weapon must have a name']
        },
        imgUrl: {
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
