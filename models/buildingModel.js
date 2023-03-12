var mongoose = require('mongoose');
var validator = require('validator');

const buildingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, 'Building names must be unique'],
            required: [true, 'A building must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'A building must have an image']
        },
        desc: {
            type: String,
            required: [true, 'A building must have a description']
        },
        income: {
            type: Number,
            min: 0,
            max: 10000
        },
        lvl: {
            type: Number,
            default: 1,
            max: 50
        },
        tier: {
            type: Number,
            default: 1,
            max: [5, 'A tier can only go up to 5']
        },
        leader: {
            type: mongoose.Schema.ObjectId,
            ref: 'Monster'  
        },
        location: {
            type: mongoose.Schema.ObjectId,
            ref: 'Location'
        },
        buildCost: {
            type: Number,
            min: 0,
            max: 1000000000
        },
        depth: {
            type: Number,
            min: 1,
            max: 10,
            default: 1
        },
        clickAction: {
            type: String,
            default: 'None'
        },
        interval: {
            type: Number,
            default: 3
        }
    }
);

buildingSchema.path('clickAction').validate(function (val){
    console.log(val, this);
});

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;