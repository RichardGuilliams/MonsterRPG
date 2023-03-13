const User = require('../models/player/userModel');
const catchAsync = require('../utils/catchAsync');
const Building = require('../models/building/buildingModel');

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

exports.getStronghold = async (req, res) => {
  const buildings = await Building.find();

  res.status(200).render('playerMenu/stronghold', {
    title: 'Stronghold',
    buildings
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