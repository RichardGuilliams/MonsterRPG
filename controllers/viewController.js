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
})
  
exports.getLoginForm = factory.getView('authentication/login', 'Log Into Your Account');
exports.getSignupForm = factory.getView('authentication/signup', 'Create An Account');

exports.getOverview = factory.getView('overview', 'Overview');
exports.getShop = factory.getView('playerMenu/shop', 'Shop');
exports.getBuilding = factory.getView('playerMenu/building', 'Building');
exports.getMonsterFusion = factory.getView('playerMenu/monsterFusion', 'MonsterFusion');
exports.getBattle = factory.getView('playerMenu/battle', 'Battle');
  
exports.getWeaponForm = factory.getView('creatorMenu/forms/weaponForm', 'Create A New Weapon', Weapon);
exports.getArmorForm = factory.getView('creatorMenu/forms/armorForm', 'Create A New Armor', Armor);
exports.getItemForm = factory.getView('creatorMenu/forms/itemForm', 'Create A New Item', Item);  
exports.getMonsterForm = factory.getView('creatorMenu/forms/monsterForm', 'Create A New Monster', Monster);
exports.getCollarForm = factory.getView('creatorMenu/forms/collarForm', 'Create A New Collar', Collar);
exports.getCharmForm = factory.getView('creatorMenu/forms/CharmForm', 'Create A New Charm', Charm);
exports.getBuildingForm = factory.getView('creatorMenu/forms/buildingForm', 'Create A New Building', Location);
exports.getAllianceForm = factory.getView('creatorMenu/forms/allianceForm', 'Create A New Alliance', Alliance);
exports.getLocationForm = factory.getView('creatorMenu/forms/locationForm', 'Create A New Location', Monster, Item, Weapon, Armor, Charm, Collar);
exports.getMoveForm = factory.getView('creatorMenu/forms/moveForm', 'Create A New Move');
exports.getAccount = factory.getView('playerMenu/account', 'Your Account');

exports.getMonsters = factory.getView('creatorMenu/monsters', 'Monsters', Monster);
exports.getMoves = factory.getView('creatorMenu/moves', 'Moves', Move);
exports.getWeapons = factory.getView('creatorMenu/weapons', 'weapons', Weapon);
exports.getArmors = factory.getView('creatorMenu/armors', 'Armors', Armor);
exports.getItems = factory.getView('creatorMenu/items', 'Items', Item);
exports.getCharms = factory.getView('creatorMenu/charms', 'Charms', Charm);
exports.getCollars = factory.getView('creatorMenu/collars', 'Collars', Collar);
exports.getLocations = factory.getView('creatorMenu/locations', 'Locations', Location);
exports.getUsers = factory.getView('creatorMenu/users', 'Users', User);
exports.getBuildings = factory.getView('creatorMenu/buildings', 'Buildings', Building);
exports.getAlliances = factory.getView('creatorMenu/alliances', 'Alliances', Alliance);