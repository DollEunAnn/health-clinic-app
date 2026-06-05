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

// DYNAMIC ENV OVERRIDE: Automatically routes the documentation UI destination
if (isProd) {
    swaggerDocument.host = 'health-clinic-app.onrender.com';
    swaggerDocument.schemes = ['https'];
} else {
    swaggerDocument.host = `localhost:${port}`;
    swaggerDocument.schemes = ['http'];
}

// Dynamically sets allowed CORS origins based on the execution domain context
app.use(cors({ 
    origin: isProd ? 'https://health-clinic-app.onrender.com' : `http://localhost:${port}`, 
    credentials: true 
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Dynamic session engine configurations perfectly separated per environment context
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-random-secret',
    resave: false,
    saveUninitialized: false, 
    cookie: {
        path: '/',
        domain: isProd ? 'health-clinic-app.onrender.com' : 'localhost',
        secure: isProd, // True on secure HTTPS production channels, false on HTTP local
        sameSite: isProd ? 'none' : 'lax'
    }
}));

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