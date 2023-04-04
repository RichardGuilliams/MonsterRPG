const multer = require('multer');
const sharp = require('sharp');
const Monster = require('../../models/data/monsterModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const ObjectFeatures = require('../../utils/objectFeatures');

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
  const monsters = await Monster.find();
  monsters.splice(0, 0, {name: 'None'}) 
  const filteredBody = ObjectFeatures.filterObj(req.body,
    'name', 'desc', 'rank', 'hp', 'mp', 'atk', 'mAtk', 'def', 'mDef', 'spd', 'agl', 'luk',
    'tamerType1', 'tamerType2', 'monsterType1', 'monsterType2', 'attribute1', 'attribute2', 'fusion1', 'fusion2', 'fusion3', 'fusion4', 'fusion5'
  );

    if (req.file) filteredBody.photo = req.file.filename;

    if (filteredBody.fusion1) filteredBody.fusion1 = ObjectFeatures.getIdByName(monsters, filteredBody.fusion1)
    if (filteredBody.fusion2) filteredBody.fusion2 = ObjectFeatures.getIdByName(monsters, filteredBody.fusion2)
    if (filteredBody.fusion3) filteredBody.fusion3 = ObjectFeatures.getIdByName(monsters, filteredBody.fusion3)
    if (filteredBody.fusion4) filteredBody.fusion4 = ObjectFeatures.getIdByName(monsters, filteredBody.fusion4)
    if (filteredBody.fusion5) filteredBody.fusion5 = ObjectFeatures.getIdByName(monsters, filteredBody.fusion5)
  
  let monster = {
    name: filteredBody.name,
    desc: filteredBody.desc,
    rank: filteredBody.rank,
    stats: {
      hp: filteredBody.hp,
      mp: filteredBody.mp,
      atk: filteredBody.atk,
      def: filteredBody.def,
      mAtk: filteredBody.mAtk,
      mDef: filteredBody.mDef,
      spd: filteredBody.spd,
      agl: filteredBody.agl,
      luk: filteredBody.luk
    },
    tamerTypes: [
      filteredBody.tamerType1,
      filteredBody.tamerType2
    ],
    types: [
      filteredBody.monsterType1,
      filteredBody.monsterType2
    ],
    attributes: [
      filteredBody.attribute1,
      filteredBody.attribute2
    ],
    fusionMonsters: [
      filteredBody.fusion1 ? filteredBody.fusion1 : undefined,
      filteredBody.fusion2 ? filteredBody.fusion2 : undefined,
      filteredBody.fusion3 ? filteredBody.fusion3 : undefined,
      filteredBody.fusion4 ? filteredBody.fusion4 : undefined,
      filteredBody.fusion5 ? filteredBody.fusion5 : undefined,
    ],
    photo: filteredBody.photo ? filteredBody.photo : 'default.jpg'
  }
  
  
  newMonster = await Monster.create(monster);
  
  res.status(200).json({
    status: 'success',
    newMonster
  })
})

exports.getMonster = factory.getOne(Monster);
exports.getAllMonsters = factory.getAll(Monster);
exports.updateMonster = factory.updateOne(Monster);
exports.deleteMonster = factory.deleteOne(Monster);