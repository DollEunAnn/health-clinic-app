// ============================================
// APPOINTMENT CONTROLLER
// Author: Boiketlo
// Description: Logic for appointment CRUD operations
// ============================================

const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags = ['Appointments']
    //#swagger.summary = 'Endpoint to get all appointments.'
    try{
        const result = await mongodb.getDatabase().db('health_clinic_db').collection('appointments').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err});
    }   
};

const getOne = async(req, res) => {
    //#swagger.tags = ['Appointments']
    //#swagger.summary = 'Get a single appointment record by appointment id.'
    try{
        if (!ObjectId.isValid(req.params.id)){
            res.status(400).json('Must use a valid appointment id to find appointment')
        }
        const appointmentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('health_clinic_db').collection('appointments').find({_id: appointmentId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(result[0]); 
    } catch(err) {
        res.status(500).json({message: err});
    }   
};

const bookAppointment = async (req, res) => {
    //#swagger.tags = ['Appointments']
    //#swagger.summary = 'Book a new appointment.'
    try{
        const appointment = {
        doctorId: req.body.doctorId,
        patientName: req.body.patientName,
        patientEmail: req.body.patientEmail,
        visitDate: req.body.visitDate,
        timeSlot: req.body.timeSlot,
        checkInStatus : req.body.checkInStatus,
        primarySymptomDescription : req.body.primarySymptomDescription
        };
        const response = await mongodb.getDatabase().db('health_clinic_db').collection('appointments').insertOne(appointment);
        if (response.acknowledged > 0) {
            res.status(204).send();
        }
    } catch(err){
        res.status(500).json({message: err});
    }
};

const updateAppointment = async (req, res) => {
    //#swagger.tags = ['Appointments']
    //#swagger.summary = 'Update an appointment record by appointment id.'
    try{
        if (!ObjectId.isValid(req.params.id)){
            res.status(400).json('Must use a valid appointment id to update appointment')
        }
        const appointmentId = new ObjectId(req.params.id);
        const appointment = {
        doctorId: req.body.doctorId,
        patientName: req.body.patientName,
        patientEmail: req.body.patientEmail,
        visitDate: req.body.visitDate,
        timeSlot: req.body.timeSlot,
        checkInStatus : req.body.checkInStatus,
        primarySymptomDescription : req.body.primarySymptomDescription
        };
        const response = await mongodb.getDatabase().db('health_clinic_db').collection('appointments').replaceOne({_id: appointmentId}, appointment);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        }
    } catch(err){
        res.status(500).json({message: err});
    }
};

const deleteAppointment = async (req, res) => {
    //#swagger.tags = ['Appointments']
    //#swagger.summary = 'Delete an appointment record by appointment id.'  
    try{
        if (!ObjectId.isValid(req.params.id)){
            res.status(400).json('Must use a valid appointment id to delete appointment')
        }
        const appointmentId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('health_clinic_db').collection('appointments').deleteOne({_id: appointmentId}, true);
        if (response.deletedCount > 0) {
            res.status(204).send();
        }
    } catch(err){
        res.status(500).json({message: err});
    }
};

module.exports = {getAll, getOne, bookAppointment, updateAppointment, deleteAppointment}