const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

// Added by Raphael: Full CRUD handlers built to process patient records securely with explicit try/catch blocks.

const getAll = async (req, res) => {
    // #swagger.tags = ['Patients']
    // #swagger.summary = 'Get all patients record.'
    try {
        const result = await mongodb
        .getDatabase()
        .db('health_clinic_db')
        .collection('patients')
        .find()
        .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message || error });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Patients']
    // #swagger.summary = 'Get a single patient record by patient id.'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid patient ID to find a patient.' });
        }
        const patientId = new ObjectId(req.params.id);
        const result = await mongodb
        .getDatabase()
        .db('health_clinic_db')
        .collection('patients')
        .find({ _id: patientId })
        .toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(400).json({ message: error.message || error });
    }
};

const createPatient = async (req, res) => {
    // #swagger.tags = ['Patients']
    // #swagger.summary = 'Create a patient record.'
    try {
        const patient = {
            medicalRecordNumber: req.body.medicalRecordNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            contactEmail: req.body.contactEmail,
            emergencyPhone: req.body.emergencyPhone
        };

        const response = await mongodb
        .getDatabase()
        .db('health_clinic_db')
        .collection('patients')
        .insertOne(patient);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Some error occurred while creating the patient.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || error });
    }
};

const updatePatient = async (req, res) => {
     // #swagger.tags = ['Patients']
     // #swagger.summary = 'Update a patient record by patient id.'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid patient ID to update a patient.' });
        }
        const patientId = new ObjectId(req.params.id);
        const patient = {
            medicalRecordNumber: req.body.medicalRecordNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            contactEmail: req.body.contactEmail,
            emergencyPhone: req.body.emergencyPhone
        };

        const response = await mongodb
        .getDatabase()
        .db('health_clinic_db')
        .collection('patients')
        .replaceOne({ _id: patientId }, patient);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while updating the patient.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || error });
    }
};

const deletePatient = async (req, res) => {
    // #swagger.tags = ['Patients']
    // #swagger.summary = 'Delete a patient record by patient id.'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid patient ID to delete a patient.' });
        }
        const patientId = new ObjectId(req.params.id);
        const response = await mongodb
        .getDatabase()
        .db('health_clinic_db')
        .collection('patients')
        .deleteOne({ _id: patientId });

        if (response.deletedCount > 0) {
            res.status(200).json(response);
        } else {
            res.status(500).json({ message: 'Some error occurred while deleting the patient.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || error });
    }
};

module.exports = {
    getAll,
    getSingle,
    createPatient,
    updatePatient,
    deletePatient
};