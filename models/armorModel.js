var mongoose = require('mongoose');
var validator = require('validator');

const armorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, 'A name must be unique'],
            required: [true, 'An armor must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'An armor must have an image']
        },
        desc: {
            type: String,
            required: [true, 'A armor must have a description']
        },
        tier: {
            type: Number,
            min: 1,
            max: [5, 'A tier cannot exceed 5']
        },
        price: {
            type: Number,
            default: 10
        },
        buffs: {
            type: [Object]
        }
    }
)

const Armor = mongoose.model('Armor', armorSchema);

module.exports = Armor;
