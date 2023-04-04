const multer = require('multer');
const sharp = require('sharp');
const Move = require('../../models/data/moveModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');


exports.getMove = factory.getOne(Move);
exports.getAllMoves = factory.getAll(Move);
exports.createMove = factory.createOne(Move);
exports.updateMove = factory.updateOne(Move);
exports.deleteMove = factory.deleteOne(Move);