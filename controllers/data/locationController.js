const multer = require('multer');
const sharp = require('sharp');
const Location = require('../../models/data/locationModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/Locations');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `Location-${req.Location.id}-${Date.now()}.${ext}`);
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

exports.uploadLocationPhoto = upload.single('photo');

exports.resizeLocationPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `location-${req.location.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/locations/${req.file.filename}`);

  next();
});

exports.getLocation = factory.getOne(Location);
exports.getAllLocations = factory.getAll(Location);
exports.createLocation = factory.createOne(Location);
exports.updateLocation = factory.updateOne(Location);
exports.deleteLocation = factory.deleteOne(Location);