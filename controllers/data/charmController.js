const multer = require('multer');
const sharp = require('sharp');
const Charm = require('../../models/data/charmModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/Charms');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `Charm-${req.Charm.id}-${Date.now()}.${ext}`);
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

exports.uploadCharmPhoto = upload.single('photo');

exports.resizeCharmPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `charm-${req.charm.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/charms/${req.file.filename}`);

  next();
});

exports.getCharm = factory.getOne(Charm);
exports.getAllCharms = factory.getAll(Charm);
exports.createCharm = factory.createOne(Charm);
exports.updateCharm = factory.updateOne(Charm);
exports.deleteCharm = factory.deleteOne(Charm);