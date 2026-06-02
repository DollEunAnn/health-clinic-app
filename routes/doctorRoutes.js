const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Added by Raphael: Route endpoints mapping client requests to individual doctor CRUD controllers.

router.get('/', doctorController.getAll);

router.get('/:id', doctorController.getSingle);

router.post('/', doctorController.createDoctor);

router.put('/:id', doctorController.updateDoctor);

router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;