const express = require('express');
const viewController = require('./../controllers/viewController');
const testController = require('./../controllers/testController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', 
    authController.isLoggedIn, 
    // viewController.getOverview
    testController.getTest
);

router.get('/login', authController.isLoggedIn, viewController.getLoginForm);

router.get('/signUp', authController.isLoggedIn, viewController.getSignupForm);

router.get('/me', authController.protect, viewController.getAccount);

// TODO Assign the proper controller functions to the corresponding routes
router.get('/stronghold', authController.protect, viewController.getStronghold);

router.get('/shop', authController.protect, viewController.getShop);

router.get('/building', authController.protect, viewController.getBuilding);

router.get('/monsterFusion', authController.protect, viewController.getMonsterFusion);

router.get('/battle', authController.protect, viewController.getBattle);


module.exports = router;
