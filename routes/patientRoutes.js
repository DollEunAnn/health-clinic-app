const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Added by Raphael: Route endpoints mapping client requests to individual patient CRUD controllers.

router.get('/', patientController.getAll);

router.get('/:id', patientController.getSingle);

router.post('/', patientController.createPatient);

router.put('/:id', patientController.updatePatient);

router.delete('/:id', patientController.deletePatient);

module.exports = router;