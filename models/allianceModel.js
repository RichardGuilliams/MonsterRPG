var mongoose = require('mongoose');
var validator = require('validator');

const allianceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A alliance must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'A alliance must have an image']
        }
    }
)

const alliance = mongoose.model('alliance', allianceSchema);

module.exports = alliance;
