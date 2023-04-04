const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Backend Routing with Express
const userRouter = require('./routes/userRoutes');
const playerRouter = require('./routes/player/playerRoutes');
const allianceRouter = require('./routes/data/allianceRoutes');
const locationRouter = require('./routes/data/locationRoutes');

const monsterRouter = require('./routes/data/monsterRoutes');
const gameMonsterRouter = require('./routes/game/gameMonsterRoutes');

const buildingRouter = require('./routes/data/buildingRoutes');
const gameBuildingRouter = require('./routes/game/gameBuildingRoutes');

const itemRouter = require('./routes/data/itemRoutes');
const gameItemRouter = require('./routes/game/gameItemRoutes');

const armorRouter = require('./routes/data/armorRoutes');
const gameArmorRouter = require('./routes/game/gameArmorRoutes');

const weaponRouter = require('./routes/data/weaponRoutes');
const gameWeaponRouter = require('./routes/game/gameWeaponRoutes');

const collarRouter = require('./routes/data/collarRoutes');
const gameCollarRouter = require('./routes/game/gameCollarRoutes');

const charmRouter = require('./routes/data/charmRoutes');
const gameCharmRouter = require('./routes/game/gameCharmRoutes');

const moveRouter = require('./routes/data/moveRoutes');

//Front End Rendering with Pug
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.enable('trust proxy')

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



//Global Middleware
// Implementing cors
app.use(cors());
app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());
// Access-Control-Allow-Origin *

app.use(express.static(path.join(__dirname, '/public')));
// Data Security
app.use(helmet());

// app.use(
//     helmet.contentSecurityPolicy({
//       directives: {
//         defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
//         baseUri: ["'self'"],
//         fontSrc: ["'self'", 'https:','http:', 'data:'],
//         scriptSrc: [
//           "'self'",
//           'https:',
//           'http:',
//           'blob:'],
//         styleSrc: ["'self'", 'https:', 'http:','unsafe-inline']
//       }
//     })
//   );

//   app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Error Handling
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Rate Limiting
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60* 1000,
    message: 'You have exceeded the amount of requests allowed, please try again in one hour' 
});
app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({
    limit: '10kb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}))
app.use(cookieParser());

//Data Sanitization against nosql query injection
app.use(mongoSanitize());

//Data sanitization against cross site scripting attacks CXX
app.use(xss());

//Protect against http parameter pollution
//only params that match the strings in the whitelist will be accepted as valid
//fill whitelist array with strings representing the parameter names
app.use(hpp({
    whiteList: [
        'name',
        'email',
        'password',
        'passwordConfirm'
    ]
}));

app.use(compression());

//Serving static files
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//Routes 
app.use('/', viewRouter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/alliances', allianceRouter);
app.use('/api/v1/locations', locationRouter);

app.use('/api/v1/monsters', monsterRouter);
app.use('/api/v1/gameMonsters', gameMonsterRouter);

app.use('/api/v1/buildings', buildingRouter);
app.use('/api/v1/gameBuildings', gameBuildingRouter);

app.use('/api/v1/items', itemRouter);
app.use('/api/v1/gameItems', gameItemRouter);

app.use('/api/v1/armors', armorRouter);
app.use('/api/v1/gameArmors', gameArmorRouter);

app.use('/api/v1/weapons', weaponRouter);
app.use('/api/v1/gameWeapons', gameWeaponRouter);

app.use('/api/v1/collars', collarRouter);
app.use('/api/v1/gameCollars', gameCollarRouter);

app.use('/api/v1/charms', charmRouter);
app.use('/api/v1/gameCharms', gameCharmRouter);

app.use('/api/v1/moves', moveRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;