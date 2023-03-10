var mongoose = require('mongoose');
var validator = require('validator');

const armorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'An armor must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'An armor must have an image']
        },
        desc: {
            type: String,
            required: [true, 'A armor must have a description']
        }
    }
)

const Armor = mongoose.model('Armor', armorSchema);

module.exports = Armor;
