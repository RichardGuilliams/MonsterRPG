const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./../../models/player/userModel');
const Player = require('./../../models/player/playerModel');
const Location = require('./../../models/data/locationModel');
const Building = require('./../../models/data/buildingModel');
const Monster = require('./../../models/data/monsterModel');
const Item = require('./../../models/data/itemModel');
const Weapon = require('./../../models/data/weaponModel');
const Armor = require('./../../models/data/armorModel');
const Collar = require('./../../models/data/collarModel');
const Charm = require('./../../models/data/charmModel');
const Alliance = require('./../../models/data/allianceModel');

dotenv.config({ path: `./config.env`});

const DB = process.env.DATABASE
    .replace(`<PASSWORD>`, process.env.DATABASE_PASSWORD)
    .replace(`<USER>`, process.env.USER);

mongoose
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => console.log(`DB connection successful`));

// Read json data
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const players = JSON.parse(fs.readFileSync(`${__dirname}/players.json`, 'utf-8'));
const locations = JSON.parse(fs.readFileSync(`${__dirname}/locations.json`, 'utf-8'));
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
        await User.create(users, { validateBeforeSave: false });
        await Player.create(players, { validateBeforeSave: false });
        await Alliance.create(alliances, { validateBeforeSave: false });
        await Location.create(locations, { validateBeforeSave: false });
        await Building.create(buildings, { validateBeforeSave: false });
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
        await User.deleteMany();
        await Alliance.deleteMany();
        await Item.deleteMany();  
        await Weapon.deleteMany();
        await Armor.deleteMany();
        await Collar.deleteMany();
        await Charm.deleteMany();
        await Monster.deleteMany();
        await Player.deleteMany();
        await Location.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
}

const saveFile = async(Schema) => {
    let data;
    
    switch(Schema){
        case `User`:
            data = await User.find();
            data.map( user => {
                user.password = 'test1234'
            })
            break;

        case `Player`:
            data = await Player.find();
            break;

        case `Alliance`:
            data = await Alliance.find();
            break;

        case `Building`:
            data = await Building.find();
            break;

        case `Monster`:
            data = await Monster.find();
            break;

        case `Item`:
            data = await Item.find();
            break;

        case `Armor`:
            data = await Armor.find();
            break;

        case `Weapon`:
            data = await Weapon.find();
            break;

        case `Collar`:
            data = await Collar.find();
            break;

        case `Charm`:
            data = await Charm.find();
            break;

        case `Location`:
            data = await Location.find();
            break;            
    }

    await fs.writeFileSync(`${__dirname}/${Schema.toLowerCase()}s.json`, JSON.stringify(data));

    process.exit();
}



if(process.argv[2] === '--import') importData();
if(process.argv[2] === '--delete') deleteData();
if(process.argv[2] === '--save' && process.argv[3]) saveFile(process.argv[3]);

console.log(process.argv);
