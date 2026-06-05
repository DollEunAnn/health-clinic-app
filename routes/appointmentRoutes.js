// ============================================
// APPOINTMENT ROUTES
// Author: Boiketlo
// Description: Handles all appointment-related endpoints
// ============================================

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { isAuthenticated } = require('../middleware/authenticate'); // Import your gatekeeper

// Public routes
router.get('/', appointmentController.getAll);
router.get('/:id', appointmentController.getOne);

// Protected routes (requires login)
router.post('/', isAuthenticated, appointmentController.bookAppointment);
router.put('/:id', isAuthenticated, appointmentController.updateAppointment);
router.delete('/:id', isAuthenticated, appointmentController.deleteAppointment);

module.exports = router;