const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', 
    authController.isLoggedIn, 
    // viewController.getOverview
    viewController.getOverview
);

router.get('/login', authController.isLoggedIn, viewController.getLoginForm);

router.get('/signUp', authController.isLoggedIn, viewController.getSignupForm);

router.get('/me', authController.protect, viewController.getAccount);

// TODO Assign the proper controller functions to the corresponding routes
router.get('/users', authController.protect, authController.restrictTo('admin'), viewController.getUsers);
router.get('/alliances', authController.protect, authController.restrictTo('admin'), viewController.getAlliances);
router.get('/monsters', authController.protect, authController.restrictTo('admin'), viewController.getMonsters);
router.get('/weapons', authController.protect, authController.restrictTo('admin'), viewController.getWeapons);
router.get('/armors', authController.protect, authController.restrictTo('admin'), viewController.getArmors);
router.get('/items', authController.protect, authController.restrictTo('admin'), viewController.getItems);
router.get('/charms', authController.protect, authController.restrictTo('admin'), viewController.getCharms);
router.get('/collars', authController.protect, authController.restrictTo('admin'), viewController.getCollars);
router.get('/locations', authController.protect, authController.restrictTo('admin'), viewController.getLocations);
router.get('/buildings', authController.protect, authController.restrictTo('admin'), viewController.getBuildings);

router.get('/createMonster', authController.protect, authController.restrictTo('admin'), viewController.getMonsterForm);


router.get('/shop', authController.protect, viewController.getShop);

router.get('/building', authController.protect, viewController.getBuilding);

router.get('/monsterFusion', authController.protect, viewController.getMonsterFusion);

router.get('/battle', authController.protect, viewController.getBattle);


module.exports = router;
