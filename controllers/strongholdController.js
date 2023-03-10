const multer = require('multer');
const sharp = require('sharp');
const Stronghold = require('./../models/strongholdModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/Strongholds');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `Stronghold-${req.Stronghold.id}-${Date.now()}.${ext}`);
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

exports.uploadStrongholdPhoto = upload.single('photo');

exports.resizeStrongholdPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `Stronghold-${req.stronghold.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/Strongholds/${req.file.filename}`);

  next();
});

exports.getStronghold = factory.getOne(Stronghold);
exports.getAllStrongholds = factory.getAll(Stronghold);
exports.createStronghold = factory.createOne(Stronghold);
exports.updateStronghold = factory.updateOne(Stronghold);
exports.deleteStronghold = factory.deleteOne(Stronghold);