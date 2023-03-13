const mongoose = require('mongoose');
const ModelValidator = require('modelValidator');

const monsterCollectionSchema = new mongoose.Schema(
    {
        monsters: {
            type: [mongoose.Schema.ObjectId],
            ref: 'GameMonster',
            default: null,
            validate: [ModelValidator.limitArray(2), 'A player cannot have more than 2 monsters']
        }
    }
)

playerSchema.pre(/^find/, function(next){
    if(this.monsters == null) next();
    this.populate({
        path: 'monsters'
    })
})

const MonsterCollection = mongoose.model('MonsterCollection', monsterCollectionSchema);

module.exports = MonsterCollection;
