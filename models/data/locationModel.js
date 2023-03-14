const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'An Location must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'An Location must have an image']
        },
        desc: {
            type: String,
            required: [true, 'A Location must have a description']
        }
    }
)

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
