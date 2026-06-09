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
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
        }
        res.redirect('/api-docs');
    });
});

router.get('/logout', (req, res, next) => {
    /* #swagger.ignore = true */

    const isProd = process.env.NODE_ENV === 'production';
    const isStaging = process.env.NODE_ENV === 'staging';

    req.logout((err) => {
        if (err) { return next(err); }

        req.session.destroy((destroyErr) => {
            if (destroyErr) {
                console.error('Session destroy error:', destroyErr);
            }

            res.clearCookie('connect.sid', {
                path: '/',
                secure: isProd || isStaging,
                sameSite: isProd || isStaging ? 'none' : 'lax'
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