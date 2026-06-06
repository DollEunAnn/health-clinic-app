// prescriptionRoutes.js
// Boiketlo Nzimande | Health Clinic App | CSE 341

const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', prescriptionController.getAll);
router.get('/:id', prescriptionController.getOne);

router.post('/', isAuthenticated, prescriptionController.writePrescription);
router.put('/:id', isAuthenticated, prescriptionController.updatePrescription);
router.delete('/:id', isAuthenticated, prescriptionController.deletePrescription);

module.exports = router;