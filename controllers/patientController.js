const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
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
        res.status(400).json({ message: error });
    }
};

module.exports = {
    getAll
};