const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', patientController.getAll);
router.get('/:id', patientController.getSingle);

// Protected routes - Must route through isAuthenticated check first
router.post('/', isAuthenticated, patientController.createPatient);
router.put('/:id', isAuthenticated, patientController.updatePatient);
router.delete('/:id', isAuthenticated, patientController.deletePatient);

module.exports = router;