const mongoose = require('mongoose');

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
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        maxMembers: {
            type: Number,
            default: 20
        },
        members: {
            type: [mongoose.Schema.ObjectId],
            ref: 'User'
        },
        moderators: {
            type: [mongoose.Schema.ObjectId],
            ref: 'User'
        },
        maxMonsters: {
            type: Number,
            default: 10
        },
        monsters: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster'
        },
        lvl: {
            type: Number,
            default: 1
        },
        applyingUsers: {
            type: [mongoose.Schema.ObjectId],
            max: 60
        }
    }
)

const Alliance = mongoose.model('Alliance', allianceSchema);

module.exports = Alliance;
