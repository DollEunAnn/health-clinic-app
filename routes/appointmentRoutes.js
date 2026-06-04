// ============================================
// APPOINTMENT ROUTES
// Author: Boiketlo
// Description: Handles all appointment-related endpoints
// ============================================

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/', appointmentController.getAll);

router.get('/:id', appointmentController.getOne);

router.post('/', appointmentController.bookAppointment);

router.put('/:id', appointmentController.updateAppointment);

router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;