const multer = require('multer');
const sharp = require('sharp');
const Collar = require('./../models/collarModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/Collars');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `Collar-${req.Collar.id}-${Date.now()}.${ext}`);
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

exports.uploadCollarPhoto = upload.single('photo');

exports.resizeCollarPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `collar-${req.collar.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/collars/${req.file.filename}`);

  next();
});

exports.getCollar = factory.getOne(Collar);
exports.getAllCollars = factory.getAll(Collar);
exports.createCollar = factory.createOne(Collar);
exports.updateCollar = factory.updateOne(Collar);
exports.deleteCollar = factory.deleteOne(Collar);