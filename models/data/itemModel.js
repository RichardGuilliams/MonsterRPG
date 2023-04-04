const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, 'an items name must be unique'],
            required: [true, 'An item must have a name']
        },
        photo: {
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
