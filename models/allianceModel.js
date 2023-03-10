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
        },
        desc: {
            type: String,
            required: [true, 'A alliance must have a description']
        }
    }
)

const Alliance = mongoose.model('Alliance', allianceSchema);

module.exports = Alliance;
