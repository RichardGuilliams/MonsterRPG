const catchAsync = require('../utils/catchAsync');

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

exports.getBuildings = async (req, res) => {
  const buildings = await Building.find();

  res.status(200).render('adminMenu/buildings', {
    title: 'Building',
    buildings
  });
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  
  res.status(200).render('adminMenu/users', {
    title: 'Users',
    users
  });
};

exports.getAlliances = async (req, res) => {
  const alliances = await Alliance.find();
  
  res.status(200).render('adminMenu/alliances', {
    title: 'Alliances',
    alliances
  });
};

exports.getWeapons = async (req, res) => {
  const weapons = await Weapon.find();
  
  res.status(200).render('adminMenu/weapons', {
    title: 'Weapons',
    weapons
  });
};

exports.getItems = async (req, res) => {
  const items = await Item.find();
  
  res.status(200).render('adminMenu/items', {
    title: 'Items',
    items
  });
};

exports.getMonsters = async (req, res) => {
  const monsters = await Monster.find();
  
  res.status(200).render('adminMenu/monsters', {
    title: 'Monsters',
    monsters
  });
};

exports.getCharms = async (req, res) => {
  const charms = await Charm.find();
  
  res.status(200).render('adminMenu/charms', {
    title: 'Charms',
    charms
  });
};

exports.getCollars = async (req, res) => {
  const collars = await Collar.find();
  
  res.status(200).render('adminMenu/collars', {
    title: 'Collars',
    collars
  });
};

exports.getLocations = async (req, res) => {
  const locations = await Location.find();
  
  res.status(200).render('adminMenu/locations', {
    title: 'Locations',
    locations
  });
};

exports.getArmors = async (req, res) => {
  const armors = await Armor.find();
  
  res.status(200).render('adminMenu/armors', {
    title: 'Armors',
    armors
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