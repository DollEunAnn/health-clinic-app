const router = require('express').Router();

router.use('/', require('./swaggerRoutes'));

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/patients', require('./patientRoutes'));


module.exports = router;