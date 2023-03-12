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
        },
        charmSlots: {
            type: [mongoose.Schema.ObjectId]
        }
    }
)

collarSchema.path('charmSlots').validate(function (value) {
    console.log(value.length)
    if (value.length > 5) {
      throw new Error("A collar cannot have more than 5 charm slots");
    }
});

const Collar = mongoose.model('Collar', collarSchema);

module.exports = Collar;
