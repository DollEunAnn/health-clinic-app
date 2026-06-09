// appointmentController.js
// Boiketlo Nzimande | Health Clinic App | CSE 341
// Modified: Raphael Daveal

const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;
const { validate, appointmentRules } = require('../helpers/validator');

const getAll = async (req, res) => {
    // #swagger.tags = ['Appointments']
    // #swagger.summary = 'Endpoint to get all appointments.'
    try {
        const result = await mongodb
            .getDatabase()
            .collection('appointments')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getOne = async (req, res) => {
    // #swagger.tags = ['Appointments']
    // #swagger.summary = 'Get a single appointment record by appointment id.'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid appointment id to find appointment');
        }
        const appointmentId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .collection('appointments')
            .find({ _id: appointmentId })
            .toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const bookAppointment = async (req, res) => {
    // #swagger.tags = ['Appointments']
    // #swagger.summary = 'Book a new appointment.'
    try {
        const { passes, errors } = validate(req.body, appointmentRules);
        if (!passes) {
            return res.status(400).json({ message: 'Validation failed.', errors });
        }

        const appointment = {
            doctorId: req.body.doctorId,
            patientName: req.body.patientName,
            patientEmail: req.body.patientEmail,
            visitDate: req.body.visitDate,
            timeSlot: req.body.timeSlot,
            checkInStatus: req.body.checkInStatus,
            primarySymptomDescription: req.body.primarySymptomDescription
        };

        const response = await mongodb
            .getDatabase()
            .collection('appointments')
            .insertOne(appointment);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Some error occurred while booking the appointment.' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const updateAppointment = async (req, res) => {
    // #swagger.tags = ['Appointments']
    // #swagger.summary = 'Update an appointment record by appointment id.'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid appointment id to update appointment');
        }

        const { passes, errors } = validate(req.body, appointmentRules);
        if (!passes) {
            return res.status(400).json({ message: 'Validation failed.', errors });
        }

        const appointmentId = new ObjectId(req.params.id);
        const appointment = {
            doctorId: req.body.doctorId,
            patientName: req.body.patientName,
            patientEmail: req.body.patientEmail,
            visitDate: req.body.visitDate,
            timeSlot: req.body.timeSlot,
            checkInStatus: req.body.checkInStatus,
            primarySymptomDescription: req.body.primarySymptomDescription
        };

        const response = await mongodb
            .getDatabase()
            .collection('appointments')
            .replaceOne({ _id: appointmentId }, appointment);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while updating the appointment.' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteAppointment = async (req, res) => {
    // #swagger.tags = ['Appointments']
    // #swagger.summary = 'Delete an appointment record by appointment id.'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid appointment id to delete appointment');
        }
        const appointmentId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .collection('appointments')
            .deleteOne({ _id: appointmentId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while deleting the appointment.' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = { getAll, getOne, bookAppointment, updateAppointment, deleteAppointment };