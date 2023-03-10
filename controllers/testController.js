const User = require('../models/userModel');
const Building = require('../models/buildingModel');
const Monster = require('../models/monsterModel');
const Stronghold = require('../models/strongholdModel');
const Alliance = require('../models/allianceModel');
const catchAsync = require('../utils/catchAsync');

exports.getTest = catchAsync(async (req, res, next) => {
    const users = await User.find();
    const buildings = await Building.find();
    const monsters = await Monster.find();
    const strongholds = await Stronghold.find();
    const alliances = await Alliance.find();
    res.status(200).render('test', {
        title: 'Test Page',
        data: {
            users,
            buildings,
            monsters,
            strongholds,
            alliances
        }
    })
})