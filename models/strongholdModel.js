var mongoose = require('mongoose');
var validator = require('validator');

const strongholdSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A stronghold must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'A stronghold must have an image']
        }
    }
)

const stronghold = mongoose.model('stronghold', strongholdSchema);

module.exports = stronghold;