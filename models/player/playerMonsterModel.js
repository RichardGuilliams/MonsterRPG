const mongoose = require('mongoose');

const playerMonstersSchema = new mongoose.Schema(
    {
        monsters: {
            type: [mongoose.Schema.ObjectId],
            ref: 'GameMonster'
        }
    }
)

playerMonsterSchema.pre(/^find/, function(next){
    this.populate({
        path: 'monsters'
    })
})

const PlayerMonster = mongoose.model('PlayerMonster', playerMonsterSchema);

module.exports = PlayerMonster;
