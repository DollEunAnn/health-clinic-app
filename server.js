const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3000;
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(bodyParser.json());
app.use('/', require('./routes'));

// Fixed error handling to print properly to the console on Windows
process.on('uncaughtException', (err, origin) => {
    console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

console.log("Starting server lifecycle...");

mongodb.initDb((err) => {
    if (err) {
        console.error("!!! CRITICAL CONNECTION ERROR !!!");
        console.error(err.message || err);
        process.exit(1); // Force a visible crash message
    } else {
        app.listen(port, () => {
            console.log(`Running successfully on port ${port}`);
        });
    }
});