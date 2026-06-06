// index.js
// Raphael Daveal | Health Clinic App | CSE 341

const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', (req, res) => {
    /* #swagger.ignore = true */
    res.redirect('/api-docs');
});

router.use('/patients', require('./patientRoutes'));
router.use('/doctors', require('./doctorRoutes'));
router.use('/appointments', require('./appointmentRoutes'));
router.use('/prescriptions', require('./prescriptionRoutes'));

router.get('/login', (req, res, next) => {
    /* #swagger.ignore = true */
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/auth/google/callback', (req, res, next) => {
    /* #swagger.ignore = true */
    passport.authenticate('google', { failureRedirect: '/api-docs' })(req, res, next);
}, (req, res) => {
    res.redirect('/api-docs');
});

router.get('/logout', (req, res, next) => {
    /* #swagger.ignore = true */

    const isProd = process.env.NODE_ENV === 'production';

    req.logout((err) => {
        if (err) { return next(err); }

        req.session.destroy((destroyErr) => {
            if (destroyErr) {
                console.error('Session destroy error:', destroyErr);
            }

            res.clearCookie('connect.sid', {
                path: '/',
                secure: isProd,
                sameSite: isProd ? 'none' : 'lax'
            });

            res.redirect('/api-docs');
        });
    });
});

router.get('/auth-status', (req, res) => {
    /* #swagger.ignore = true */
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            user: req.user
        });
    } else {
        res.json({
            authenticated: false,
            user: null
        });
    }
});

module.exports = router;