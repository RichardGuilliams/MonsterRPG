const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Building = require('./../../models/buildingModel');
const Monster = require('./../../models/monsterModel');
const User = require('./../../models/userModel');
const Item = require('./../../models/itemModel');
const Weapon = require('./../../models/weaponModel');
const Armor = require('./../../models/armorModel');
const Collar = require('./../../models/collarModel');
const Charm = require('./../../models/charmModel');
const Alliance = require('./../../models/allianceModel');

dotenv.config({ path: `./config.env`});

const DB = process.env.DATABASE.replace(`<PASSWORD>`, process.env.DATABASE_PASSWORD );

mongoose
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => console.log(`DB connection successful`));

// Read json data
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const alliances = JSON.parse(fs.readFileSync(`${__dirname}/alliances.json`, 'utf-8'));
const monsters = JSON.parse(fs.readFileSync(`${__dirname}/monsters.json`, 'utf-8'));
const items = JSON.parse(fs.readFileSync(`${__dirname}/items.json`, 'utf-8'));
const weapons = JSON.parse(fs.readFileSync(`${__dirname}/weapons.json`, 'utf-8'));
const armors = JSON.parse(fs.readFileSync(`${__dirname}/armors.json`, 'utf-8'));
const collars = JSON.parse(fs.readFileSync(`${__dirname}/collars.json`, 'utf-8'));
const charms = JSON.parse(fs.readFileSync(`${__dirname}/charms.json`, 'utf-8'));
const buildings = JSON.parse(fs.readFileSync(`${__dirname}/buildings.json`, 'utf-8'));

const importData = async () => {
    try {
        await Building.create(buildings, { validateBeforeSave: false });
        await User.create(users, { validateBeforeSave: false });
        await Alliance.create(alliances, { validateBeforeSave: false });
        await Item.create(items, { validateBeforeSave: false });  
        await Weapon.create(weapons, { validateBeforeSave: false });
        await Armor.create(armors, { validateBeforeSave: false });
        await Collar.create(collars, { validateBeforeSave: false });
        await Charm.create(charms, { validateBeforeSave: false });
        await Monster.create(monsters, { validateBeforeSave: false });

        console.log('Data successfully loaded');
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
};

// Delete all data from database
const deleteData = async () => {
    try {
        await Building.deleteMany();
        await User.deleteMany()
        await Alliance.deleteMany()
        await Item.deleteMany()  
        await Weapon.deleteMany()
        await Armor.deleteMany()
        await Collar.deleteMany()
        await Charm.deleteMany()
        await Monster.deleteMany()
        console.log('Data successfully deleted');
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
}

if(process.argv[2] === '--import') importData();
if(process.argv[2] === '--delete') deleteData();

console.log(process.argv);
