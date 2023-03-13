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
const playerRouter = require('./routes/playerRoutes');

const monsterRouter = require('./routes/monsterRoutes');
const gameMonsterRouter = require('./routes/gameMonsterRoutes');
const monsterCollectionRouter = require('./routes/monsterCollectionRoutes');

const buildingRouter = require('./routes/buildingRoutes');
const gameBuildingRouter = require('./routes/gameBuildingRoutes');
const buildingCollectionRouter = require('./routes/buildingCollectionRoutes');

const allianceRouter = require('./routes/allianceRoutes');
const itemRouter = require('./routes/itemRoutes');
const armorRouter = require('./routes/armorRoutes');
const weaponRouter = require('./routes/weaponRoutes');
const collarRouter = require('./routes/collarRoutes');
const charmRouter = require('./routes/charmRoutes');

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

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

//Routes 
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/monsters', monsterRouter);
app.use('/api/v1/gameMonsters', gameMonsterRouter);
app.use('/api/v1/playerMonsters', monsterCollectionRouter);

app.use('/api/v1/buildings', buildingRouter);
app.use('/api/v1/gameBuildings', gameBuildingRouter);
app.use('/api/v1/playerBuildings', buildingCollectionRouter);

app.use('/api/v1/alliances', allianceRouter);
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/armors', armorRouter);
app.use('/api/v1/weapons', weaponRouter);
app.use('/api/v1/collars', collarRouter);
app.use('/api/v1/charms', charmRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;