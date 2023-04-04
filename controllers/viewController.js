const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');

const User = require('../models/player/userModel');
const Building = require('../models/data/buildingModel');
const Monster = require('../models/data/monsterModel');
const Alliance = require('../models/data/allianceModel');
const Charm = require('../models/data/charmModel');
const Collar = require('../models/data/collarModel');
const Location = require('../models/data/locationModel');
const Weapon = require('../models/data/weaponModel');
const Armor = require('../models/data/armorModel');
const Item = require('../models/data/itemModel');
const Move = require('../models/data/moveModel');


exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'payment')
  res.locals.alert =
  "Your payment was successful! Please check your email for a confirmation.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('overview', {
    title: 'Overview',
    data: {
      enemy: {name: 'bat'},
      player: {name: 'player'}
    }
  });
});

exports.getMonsterForm = async(req, res, next) => {
  const monsters = await Monster.find();
  res.status(200).render('adminMenu/forms/monsterForm', {
    title: 'Create A New Monster',
    monsters
  });
};

exports.getMoveForm = async(req, res, next) => {
  const moves = await Move.find();
  res.status(200).render('adminMenu/forms/moveForm', {
    title: 'Create A New Move',
    moves
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('authentication/login', {
    title: 'Log into your account'
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('authentication/signup', {
    title: 'Create an account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('playerMenu/account', {
    title: 'Your account'
  });
};


exports.getShop = (req, res) => {
  res.status(200).render('playerMenu/shop', {
    title: 'Shop'
  });
};

exports.getBuilding = (req, res) => {
  res.status(200).render('playerMenu/building', {
    title: 'Building'
  });
};

exports.getMonsterFusion = (req, res) => {
  res.status(200).render('playerMenu/monsterFusion', {
    title: 'Monster Fusion'
  });
};


exports.getBattle = (req, res) => {
  res.status(200).render('playerMenu/battle', {
    title: 'Battle'
  });
};



exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
    );
    
    res.status(200).render('account', {
      title: 'Your account',
      user: updatedUser
  });
});

exports.getMonsters = factory.getView(Monster, 'adminMenu/monsters', 'Monsters');
exports.getMoves = factory.getView(Move, 'adminMenu/moves', 'Moves');
exports.getWeapons = factory.getView(Weapon, 'adminMenu/weapons', 'weapons');
exports.getArmors = factory.getView(Armor, 'adminMenu/armors', 'Armors');
exports.getItems = factory.getView(Item, 'adminMenu/items', 'Items');
exports.getCharms = factory.getView(Charm, 'adminMenu/charms', 'Charms');
exports.getCollars = factory.getView(Collar, 'adminMenu/collars', 'Collars');
exports.getLocations = factory.getView(Location, 'adminMenu/locations', 'Locations');
exports.getUsers = factory.getView(User, 'adminMenu/users', 'Users');
exports.getBuildings = factory.getView(Building, 'adminMenu/buildings', 'Buildings');
exports.getAlliances = factory.getView(Alliance, 'adminMenu/alliances', 'Alliances');