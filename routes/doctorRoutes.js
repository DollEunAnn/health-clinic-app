const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', doctorController.getAll);
router.get('/:id', doctorController.getSingle);

// Protected routes (requires login)
router.post('/', isAuthenticated, doctorController.createDoctor);
router.put('/:id', isAuthenticated, doctorController.updateDoctor);
router.delete('/:id', isAuthenticated, doctorController.deleteDoctor);

module.exports = router;