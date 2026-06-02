const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

// Added by Raphael: Full CRUD handlers built to process doctor records securely with explicit try/catch blocks.

const getAll = async (req, res) => {
    try {
        const result = await mongodb
        .getDatabase()
        .db('health_clinic_db')
        .collection('doctors')
        .find()
        .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message || error });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid doctor ID to find a doctor.' });
        }
        const doctorId = new ObjectId(req.params.id);
        const result = await mongodb
        .getDatabase()
        .db('health_clinic_db')
        .collection('doctors')
        .find({ _id: doctorId })
        .toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'Doctor not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(400).json({ message: error.message || error });
    }
};

const createDoctor = async (req, res) => {
    try {
        const doctor = {
            staffId: req.body.staffId,
            practitionerName: req.body.practitionerName,
            medicalSpecialty: req.body.medicalSpecialty,
            consultationRoom: req.body.consultationRoom,
            weeklyHours: req.body.weeklyHours,
            contactEmail: req.body.contactEmail,
            isAcceptingPatients: req.body.isAcceptingPatients
        };

        const response = await mongodb
        .getDatabase()
        .db('health_clinic_db')
        .collection('doctors')
        .insertOne(doctor);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Some error occurred while creating the doctor.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || error });
    }
};

const updateDoctor = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid doctor ID to update a doctor.' });
        }
        const doctorId = new ObjectId(req.params.id);
        const doctor = {
            staffId: req.body.staffId,
            practitionerName: req.body.practitionerName,
            medicalSpecialty: req.body.medicalSpecialty,
            consultationRoom: req.body.consultationRoom,
            weeklyHours: req.body.weeklyHours,
            contactEmail: req.body.contactEmail,
            isAcceptingPatients: req.body.isAcceptingPatients
        };

        const response = await mongodb
        .getDatabase()
        .db('health_clinic_db')
        .collection('doctors')
        .replaceOne({ _id: doctorId }, doctor);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while updating the doctor.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || error });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid doctor ID to delete a doctor.' });
        }
        const doctorId = new ObjectId(req.params.id);
        const response = await mongodb
        .getDatabase()
        .db('health_clinic_db')
        .collection('doctors')
        .deleteOne({ _id: doctorId });

        if (response.deletedCount > 0) {
            res.status(200).json(response);
        } else {
            res.status(500).json({ message: 'Some error occurred while deleting the doctor.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || error });
    }
};

module.exports = {
    getAll,
    getSingle,
    createDoctor,
    updateDoctor,
    deleteDoctor
};