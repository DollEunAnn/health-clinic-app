// appointmentRoutes.js
// Boiketlo Nzimande | Health Clinic App | CSE 341

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', appointmentController.getAll);
router.get('/:id', appointmentController.getOne);

router.post('/', isAuthenticated, appointmentController.bookAppointment);
router.put('/:id', isAuthenticated, appointmentController.updateAppointment);
router.delete('/:id', isAuthenticated, appointmentController.deleteAppointment);

module.exports = router;