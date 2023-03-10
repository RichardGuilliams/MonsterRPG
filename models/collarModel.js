var mongoose = require('mongoose');
var validator = require('validator');

const collarSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'An collar must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'An collar must have an image']
        },
        desc: {
            type: String,
            required: [true, 'A collar must have a description']
        }
    }
)

const Collar = mongoose.model('Collar', collarSchema);

module.exports = Collar;
