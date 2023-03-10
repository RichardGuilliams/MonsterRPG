const multer = require('multer');
const sharp = require('sharp');
const Building = require('./../models/buildingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/Buildings');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `Building-${req.Building.id}-${Date.now()}.${ext}`);
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

exports.uploadBuildingPhoto = upload.single('photo');

exports.resizeBuildingPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `building-${req.building.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/buildings/${req.file.filename}`);

  next();
});

exports.getBuilding = factory.getOne(Building);
exports.getAllBuildings = factory.getAll(Building);
exports.createBuilding = factory.createOne(Building);
exports.updateBuilding = factory.updateOne(Building);
exports.deleteBuilding = factory.deleteOne(Building);