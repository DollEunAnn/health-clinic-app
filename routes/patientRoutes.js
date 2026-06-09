// patientRoutes.js
// Raphael Daveal | Health Clinic App | CSE 341

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', patientController.getAll);
router.get('/:id', patientController.getSingle);

router.post('/', isAuthenticated, patientController.createPatient);
router.put('/:id', isAuthenticated, patientController.updatePatient);
router.delete('/:id', isAuthenticated, patientController.deletePatient);

module.exports = router;