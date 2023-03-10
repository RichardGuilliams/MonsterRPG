var mongoose = require('mongoose');
var validator = require('validator');

const charmSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'An charm must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'An charm must have an image']
        },
        desc: {
            type: String,
            required: [true, 'A weapon must have a description']
        }
    }
)

const Charm = mongoose.model('Charm', charmSchema);

module.exports = Charm;
