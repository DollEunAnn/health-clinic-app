// middleware/authenticate.js
const error = require('./error');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(error.UNAUTHORIZED.status).json({ message: error.UNAUTHORIZED.message });
};

module.exports = {
  isAuthenticated
};