// server.js
// Eunice Ann Hernandez Dollete | Health Clinic App | CSE 341
// Modified: Raphael Daveal

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
const passport = require('passport');
const session = require('express-session');

require('./middleware/passport');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3000;
const app = express();

const isProd = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';

if (isProd) {
    swaggerDocument.host = 'health-clinic-app.onrender.com';
    swaggerDocument.schemes = ['https', 'http'];
} else if (isStaging) {
    swaggerDocument.host = 'health-clinic-app-staging.onrender.com';
    swaggerDocument.schemes = ['https', 'http'];
} else {
    swaggerDocument.host = `localhost:${port}`;
    swaggerDocument.schemes = ['http', 'https'];
}

app.use(cors({
    origin: isProd
        ? 'https://health-clinic-app.onrender.com'
        : isStaging
        ? 'https://health-clinic-app-staging.onrender.com'
        : `http://localhost:${port}`,
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'your-random-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        secure: isProd || isStaging,
        sameSite: isProd || isStaging ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
        withCredentials: true
    }
}));

app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.error(err.message || err);
        process.exit(1);
    } else {
        app.listen(port, () => {
            console.log(`Running on port ${port}`);
        });
    }
});