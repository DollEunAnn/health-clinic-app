const router = require('express').Router();
const passport = require('passport');

// Root path catch handler to bounce interface visits back to documentation UI engine
router.get('/', (req, res) => {
    /* #swagger.ignore = true */
    res.redirect('/api-docs');
});

// Resource module collections links mounting definitions
router.use('/patients', require('./patientRoutes'));
router.use('/doctors', require('./doctorRoutes'));
router.use('/appointments', require('./appointmentRoutes'));
router.use('/prescriptions', require('./prescriptionRoutes'));

// Authentication Endpoints
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
    
    // 1. Break internal passport linkage tracking state
    req.logout((err) => {
        if (err) { return next(err); }
        
        // 2. Wipe memory session data block matching the active node
        req.session.destroy((destroyErr) => {
            if (destroyErr) { return next(destroyErr); }
            
            // 3. Clear cookie passing explicit parameters to clear respective browser domain state
            res.clearCookie('connect.sid', { 
                path: '/',
                domain: isProd ? 'health-clinic-app.onrender.com' : 'localhost',
                secure: isProd,
                sameSite: isProd ? 'none' : 'lax'
            }); 
            
            // 4. Return user back to relative root entry route
            res.redirect('/'); 
        });
    });
});

module.exports = router;