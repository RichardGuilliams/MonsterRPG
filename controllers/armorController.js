const multer = require('multer');
const sharp = require('sharp');
const Armor = require('./../models/armorModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/Armors');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `Armor-${req.Armor.id}-${Date.now()}.${ext}`);
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

exports.uploadArmorPhoto = upload.single('photo');

exports.resizeArmorPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `Armor-${req.armor.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/armors/${req.file.filename}`);

  next();
});

exports.getArmor = factory.getOne(Armor);
exports.getAllArmors = factory.getAll(Armor);
exports.createArmor = factory.createOne(Armor);
exports.updateArmor = factory.updateOne(Armor);
exports.deleteArmor = factory.deleteOne(Armor);