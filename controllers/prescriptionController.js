// ============================================
// PRESCRIPTION CONTROLLER
// Author: Boiketlo
// Modifications: Raphael (Fixed 201 status code return and insertion acknowledgment validation)
// Description: Logic for prescription CRUD operations
// ============================================

const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags = ['Prescriptions']
    // #swagger.summary = 'Get all prescriptions records.'
    try{
        const result = await mongodb.getDatabase().db('health_clinic_db').collection('prescriptions').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err});
    }   
};

const getOne = async(req, res) => {
    //#swagger.tags = ['Prescriptions']
    // #swagger.summary = 'Get a single prescription record by prescription id.'
    try{
        if (!ObjectId.isValid(req.params.id)){
            return res.status(400).json('Must use a valid prescription id to find prescription');
        }
        const prescriptionId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('health_clinic_db').collection('prescriptions').find({_id: prescriptionId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(result[0]); 
    } catch(err) {
        res.status(500).json({message: err});
    }   
};

const writePrescription = async (req, res) => {
    //#swagger.tags = ['Prescriptions']
    // #swagger.summary = 'Create a prescription record.'
    try{
        const prescription = {
        rxNumber: req.body.rxNumber,
        patientRecordNumber: req.body.patientRecordNumber,
        medicationName: req.body.medicationName,
        dosageStrength: req.body.dosageStrength,
        frequencyPerDay: req.body.frequencyPerDay,
        refillsRemaining : req.body.refillsRemaining,
        specialInstructions : req.body.specialInstructions
        };
        const response = await mongodb.getDatabase().db('health_clinic_db').collection('prescriptions').insertOne(prescription);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({message: 'Some error occurred while creating the prescription.'});
        }
    } catch(err){
        res.status(500).json({message: err});
    }
};

const updatePrescription = async (req, res) => {
    // #swagger.tags = ['Prescriptions']
    // #swagger.summary = 'Update a prescription record by prescription id.'
    try{
        if (!ObjectId.isValid(req.params.id)){
            return res.status(400).json('Must use a valid prescription id to update prescription');
        }
        const prescriptionId = new ObjectId(req.params.id);
        const prescription = {
        rxNumber: req.body.rxNumber,
        patientRecordNumber: req.body.patientRecordNumber,
        medicationName: req.body.medicationName,
        dosageStrength: req.body.dosageStrength,
        frequencyPerDay: req.body.frequencyPerDay,
        refillsRemaining : req.body.refillsRemaining,
        specialInstructions : req.body.specialInstructions
        };
        const response = await mongodb.getDatabase().db('health_clinic_db').collection('prescriptions').replaceOne({_id: prescriptionId}, prescription);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({message: 'Some error occurred while updating the prescription.'});
        }
    } catch(err){
        res.status(500).json({message: err});
    }
};

const deletePrescription = async (req, res) => {
    // #swagger.tags = ['Prescriptions']
    // #swagger.summary = 'Delete a prescription record by prescription id.'
    try{
        if (!ObjectId.isValid(req.params.id)){
            return res.status(400).json('Must use a valid prescription id to delete prescription');
        }
        const prescriptionId  = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('health_clinic_db').collection('prescriptions').deleteOne({_id: prescriptionId }, true);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({message: 'Some error occurred while deleting the prescription.'});
        }
    } catch(err){
        res.status(500).json({message: err});
    }
};

module.exports = {getAll, getOne, writePrescription, updatePrescription, deletePrescription};