// ============================================
// PRESCRIPTION ROUTES
// Author: Boiketlo
// Description: Handles all prescription-related endpoints
// ============================================

const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const { isAuthenticated } = require('../middleware/authenticate'); // Import your gatekeeper

// Public routes
router.get('/', prescriptionController.getAll);
router.get('/:id', prescriptionController.getOne);

// Protected routes (requires login)
router.post('/', isAuthenticated, prescriptionController.writePrescription);
router.put('/:id', isAuthenticated, prescriptionController.updatePrescription);
router.delete('/:id', isAuthenticated, prescriptionController.deletePrescription);

module.exports = router;