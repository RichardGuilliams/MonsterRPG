const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const collarSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, 'a collars name must be unique'],
            required: [true, 'An collar must have a name']
        },
        photo: {
            type: String,
            required: [true, 'An collar must have an image']
        },
        desc: {
            type: String,
            required: [true, 'A collar must have a description']
        },
        charmSlots: {
            type: [mongoose.Schema.ObjectId],
            validate: [ModelValidator.limitArray(0, 5), 'A collar cannot have more than 5 charm slots']
        }
    }
)

const Collar = mongoose.model('Collar', collarSchema);

module.exports = Collar;
