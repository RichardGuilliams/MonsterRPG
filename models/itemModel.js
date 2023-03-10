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
        },
        desc: {
            type: String,
            required: [true, 'A item must have a description']
        }
    }
)

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
