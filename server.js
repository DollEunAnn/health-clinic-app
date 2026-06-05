const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
const passport = require('passport');
const session = require('express-session');

// Important: Load passport configuration before routes execution
require('./middleware/passport');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3000;
const app = express();

const isProd = process.env.NODE_ENV === 'production';

console.log(`Environment: ${isProd ? 'PRODUCTION' : 'LOCAL'}`);
console.log(`Node ENV variable: "${process.env.NODE_ENV}"`);
console.log(`Swagger Host (from file): ${swaggerDocument.host}`);
console.log(`Server running on: ${isProd ? 'https://health-clinic-app.onrender.com' : `http://localhost:${port}`}`);

// DO NOT OVERRIDE - Use swagger.json as-is since it's pre-generated for the correct environment
// The swagger.js file generates it based on NODE_ENV, so this should already be correct

// Dynamically sets allowed CORS origins based on the execution domain context
app.use(cors({ 
    origin: isProd ? 'https://health-clinic-app.onrender.com' : `http://localhost:${port}`, 
    credentials: true 
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Dynamic session engine configurations perfectly separated per environment context
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'your-random-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        domain: isProd ? 'health-clinic-app.onrender.com' : 'localhost',
        secure: isProd, // True on secure HTTPS production channels, false on HTTP local
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
};

app.use(session(sessionConfig));

// Initialize Passport.js AFTER session middleware
app.use(passport.initialize());
app.use(passport.session());

// Serves the dynamically managed configuration definition sheet context
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Base application router engine mounting location
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

console.log("Starting server lifecycle...");

mongodb.initDb((err) => {
    if (err) {
        console.error("!!! CRITICAL CONNECTION ERROR !!!");
        console.error(err.message || err);
        process.exit(1);
    } else {
        app.listen(port, () => {
            console.log(`Running successfully on port ${port}`);
        });
    }
});