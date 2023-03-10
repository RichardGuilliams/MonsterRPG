const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Building = require('./../../models/buildingModel');

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
const buildings = JSON.parse(fs.readFileSync(`${__dirname}/buildings.json`, 'utf-8'));

const importData = async () => {
    try {
        await Building.create(buildings)
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
