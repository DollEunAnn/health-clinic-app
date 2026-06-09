// authenticate.js
// Raphael Daveal | Health Clinic App | CSE 341

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({
        message: 'Unauthorized: You must be logged in to access this resource.'
    });
};

module.exports = {
    isAuthenticated
};