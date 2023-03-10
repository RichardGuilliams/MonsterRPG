var mongoose = require('mongoose');
var validator = require('validator');

const buildingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A building must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'A building must have an image']
        }
    }
)

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;