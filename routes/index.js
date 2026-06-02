const router = require('express').Router();

router.use('/', require('./swaggerRoutes'));

router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Added by Raphael: Integrated main resource routing modules for both patients and doctors collections.
router.use('/patients', require('./patientRoutes'));
router.use('/doctors', require('./doctorRoutes'));

module.exports = router;