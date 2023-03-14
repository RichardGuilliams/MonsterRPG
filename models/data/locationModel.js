const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, 'A locations name must be unique'],
            required: [true, 'An Location must have a name']
        },
        imgUrl: {
            type: String,
            required: [true, 'An Location must have an image']
        },
        desc: {
            type: String,
            required: [true, 'A Location must have a description']
        },
        lvl1: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            required: [true, 'Location must have at least one level'],
            validate: [ModelValidator.limitArray(0, 10), 'level cannot have more than 10 monsters']
        },
        lvl2: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            required: [true, 'Location must have at least one level'],
            validate: [ModelValidator.limitArray(0, 10), 'level cannot have more than 10 monsters']
        },
        lvl3: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            required: [true, 'Location must have at least one level'],
            validate: [ModelValidator.limitArray(0, 10), 'level cannot have more than 10 monsters']
        },
        lvl4: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            required: [true, 'Location must have at least one level'],
            validate: [ModelValidator.limitArray(0, 10), 'level cannot have more than 10 monsters']
        },
        lvl5: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            required: [true, 'Location must have at least one level'],
            validate: [ModelValidator.limitArray(0, 10), 'level cannot have more than 10 monsters']
        },
        lvl6: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            required: [true, 'Location must have at least one level'],
            validate: [ModelValidator.limitArray(0, 10), 'level cannot have more than 10 monsters']
        },
        lvl7: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            required: [true, 'Location must have at least one level'],
            validate: [ModelValidator.limitArray(0, 10), 'level cannot have more than 10 monsters']
        },
        lvl8: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            required: [true, 'Location must have at least one level'],
            validate: [ModelValidator.limitArray(0, 10), 'level cannot have more than 10 monsters']
        },
        lvl9: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            required: [true, 'Location must have at least one level'],
            validate: [ModelValidator.limitArray(0, 10), 'level cannot have more than 10 monsters']
        },
        lvl10: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Monster',
            required: [true, 'Location must have at least one level'],
            validate: [ModelValidator.limitArray(0, 10), 'level cannot have more than 10 monsters']
        }
    }
)

locationSchema.pre(/^find/, function(next){
    ModelValidator.populate(this, 'lvl1', '', next);
    ModelValidator.populate(this, 'lvl2', '', next);
    ModelValidator.populate(this, 'lvl3', '', next);
    ModelValidator.populate(this, 'lvl4', '', next);
    ModelValidator.populate(this, 'lvl5', '', next);
    ModelValidator.populate(this, 'lvl6', '', next);
    ModelValidator.populate(this, 'lvl7', '', next);
    ModelValidator.populate(this, 'lvl8', '', next);
    ModelValidator.populate(this, 'lvl9', '', next);
    ModelValidator.populate(this, 'lvl10', '', next);
})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
