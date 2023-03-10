const multer = require('multer');
const sharp = require('sharp');
const Alliance = require('./../models/allianceModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/alliances');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `alliance-${req.alliance.id}-${Date.now()}.${ext}`);
//   }
// });
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadAlliancePhoto = upload.single('photo');

exports.resizeAlliancePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `alliance-${req.alliance.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/alliances/${req.file.filename}`);

  next();
});

exports.getAlliance = factory.getOne(Alliance);
exports.getAllAlliances = factory.getAll(Alliance);
exports.createAlliance = factory.createOne(Alliance);
exports.updateAlliance = factory.updateOne(Alliance);
exports.deleteAlliance = factory.deleteOne(Alliance);