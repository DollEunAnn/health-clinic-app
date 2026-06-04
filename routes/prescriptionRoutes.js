// ============================================
// PRESCRIPTION ROUTES
// Author: Boiketlo
// Description: Handles all prescription-related endpoints
// ============================================

const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

router.get('/', prescriptionController.getAll);

router.get('/:id', prescriptionController.getOne);

router.post('/', prescriptionController.writePrescription);

router.put('/:id', prescriptionController.updatePrescription);

router.delete('/:id', prescriptionController.deletePrescription);

module.exports = router;