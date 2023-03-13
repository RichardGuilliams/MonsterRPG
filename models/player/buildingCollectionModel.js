const mongoose = require('mongoose');
const ModelValidator = require('../../utils/modelValidator');

const buildingCollectionSchema = new mongoose.Schema(
    {
        buildings: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Gamebuilding',
            default: null,
            validate: [ModelValidator.limitArray(2), 'A player cannot have more than 2 buildings']
        }
    }
)

buildingCollectionSchema.pre(/^find/, function(next){
    if(this.buildings == null) next();
    this.populate({
        path: 'buildings'
    })
})

const BuildingCollection = mongoose.model('BuildingCollection', buildingCollectionSchema);

module.exports = BuildingCollection;
