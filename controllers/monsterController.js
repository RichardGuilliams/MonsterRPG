const multer = require('multer');
const sharp = require('sharp');
const Monster = require('./../models/monsterModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

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

  req.file.filename = `Monster-${req.monster.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/Monsters/${req.file.filename}`);

  next();
});

exports.createMonster = catchAsync(async(req, res, next) =>{
  if(!req.body.fusionMonsters) req.body.fusionMonsters = [];
  if(req.body.fusionMonsters.length > 5) return next(new AppError(`A monster can only contain up to 5 monsters in their fusionMonsters property`, 400));

  const monster = await Monster.create({
    name: req.body.name,
    tamerType: req.body.tamerType,
    rank: req.body.rank,
    type1: req.body.type1,
    type2: req.body.type2,
    imgUrl: req.body.imgUrl,
    lvl: req.body.lvl,
    hp: req.body.hp,
    mp: req.body.mp,
    str: req.body.str,
    def: req.body.def,
    spd: req.body.spd,
    agl: req.body.agl,
    mgk: req.body.mgk,
    sprt: req.body.sprt,
    critDmg: req.body.critDmg, 
    critRate: req.body.critRate,
    canBreed: req.body.canBreed,
    canFuse: req.body.canFuse,
    fusionMonsters: req.body.fusionMonsters
  });

  if(!monster) return next(new AppError(`Your ${req.body.name} was not created, something went wrong`, 400));

  if(!monster) return next(new AppError('Your monster was not created', 400))


  res.status(200).json({
    status: 'success',
    message: `you have successfully created a new monster ${req.body.name}`,
    monster
  })
});

exports.getMonster = factory.getOne(Monster);
exports.getAllMonsters = factory.getAll(Monster);
exports.updateMonster = factory.updateOne(Monster);
exports.deleteMonster = factory.deleteOne(Monster);