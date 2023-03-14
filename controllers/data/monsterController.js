const multer = require('multer');
const sharp = require('sharp');
const Monster = require('../../models/data/monsterModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/Monsters');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `Monster-${req.Monster.id}-${Date.now()}.${ext}`);
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

exports.uploadMonsterPhoto = upload.single('photo');

exports.resizeMonsterPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `monster-${req.monster.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/monsters/${req.file.filename}`);

  next();
});

exports.createMonster = catchAsync(async(req, res, next) => {
  let monster = req.body
  monster.stats = {
    hp: monster.hp,
    mp: monster.mp,
  }

  let newMonster = await Monster.create(monster);

  res.status(200).json({
    status: 'success',
    newMonster
  })
})

exports.getMonster = factory.getOne(Monster);
exports.getAllMonsters = factory.getAll(Monster);
exports.updateMonster = factory.updateOne(Monster);
exports.deleteMonster = factory.deleteOne(Monster);