const MonsterCollection = require('../../models/player/MonsterCollectionModel');
const Monster = require('../../models/monster/monsterModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const GameFeatures = require('../../utils/gameFeatures');
const factory = require('./../handlerFactory');

exports.getMonsterCollection = factory.getOne(MonsterCollection);
exports.getAllMonsterCollections = factory.getAll(MonsterCollection);
exports.createMonsterCollection = factory.createOne(MonsterCollection);
exports.updateMonsterCollection = factory.updateOne(MonsterCollection);
exports.deleteMonsterCollection = factory.deleteOne(MonsterCollection);