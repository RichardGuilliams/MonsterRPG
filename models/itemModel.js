var mongoose = require('mongoose');
var validator = require('validator');

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'An item must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'An item must have an image']
        }
    }
)

const item = mongoose.model('item', itemSchema);

module.exports = item;
