const multer = require('multer');
const sharp = require('sharp');
const Move = require('../../models/data/moveModel');
const ObjectFeatures = require('../../utils/objectFeatures')
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.createMove = catchAsync(async(req, res, next) => {
    const moves = await Move.find();
    moves.splice(0, 0, {name: 'None'}) ;
    const filteredBody = ObjectFeatures.filterObj(req.body, 'name', 'desc', 'power', 'accuracy', 'effect', 'target', 'targetStat', 'modifier', 'rank','moveType1', 'moveType2', 'attribute1', 'attribute2');
  
      if (req.file) filteredBody.photo = req.file.filename;
    
    let move = {
      name: filteredBody.name,
      desc: filteredBody.desc,
      rank: filteredBody.rank,
      target: filteredBody.target,
      targetStat: filteredBody.targetStat,
      modifier: filteredBody.modifier,
      power: filteredBody.power,
      accuracy: filteredBody.accuracy,
      types: [
        filteredBody.MoveType1,
        filteredBody.MoveType2
      ],
      attributes: [
        filteredBody.attribute1,
        filteredBody.attribute2
      ],
      photo: filteredBody.photo ? filteredBody.photo : 'default.jpg'
    }
    
    
    newMove = await Move.create(move);
    
    res.status(200).json({
      status: 'success',
      newMove
    })
  })

exports.getMove = factory.getOne(Move);
exports.getAllMoves = factory.getAll(Move);
exports.updateMove = factory.updateOne(Move);
exports.deleteMove = factory.deleteOne(Move);