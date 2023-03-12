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
        },
        tier: {
            type: Number,
            default: 1,
            min: 1,
            max: [10, 'A tier cannot go higher than 10']
        },
        price: {
            type: Number,
            default: 10
        },
        mainTrait: {
            type: mongoose.Schema.ObjectId
        },
        subTraits: {
            type: [mongoose.Schema.ObjectId]
        },
        rarity: {
            type: Number,
            min: 1,
            max: 5,
            default: 1
        }
    }
)

charmSchema.path('subTraits').validate(function (value) {
    console.log(value.length)
    if (value.length > 5) {
      throw new Error("A charm cannot have more than 5 sub traits");
    }
});

const Charm = mongoose.model('Charm', charmSchema);

module.exports = Charm;
