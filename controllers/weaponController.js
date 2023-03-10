const multer = require('multer');
const sharp = require('sharp');
const Weapon = require('./../models/weaponModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/Weapons');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `Weapon-${req.Weapon.id}-${Date.now()}.${ext}`);
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

exports.uploadWeaponPhoto = upload.single('photo');

exports.resizeWeaponPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `weapon-${req.weapon.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/weapons/${req.file.filename}`);

  next();
});

exports.getWeapon = factory.getOne(Weapon);
exports.getAllWeapons = factory.getAll(Weapon);
exports.createWeapon = factory.createOne(Weapon);
exports.updateWeapon = factory.updateOne(Weapon);
exports.deleteWeapon = factory.deleteOne(Weapon);