// connect.js
// Eunice Ann Hernandez Dollete | Health Clinic App | CSE 341

const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }

    let connectionString = process.env.MONGODB_URI;

    if (connectionString && connectionString.includes('${DB_USER}')) {
        connectionString = connectionString
            .replace('${DB_USER}', process.env.DB_USER || '')
            .replace('${DB_PASSWORD}', process.env.DB_PASSWORD || '');
    }

    if (!connectionString) {
        return callback(new Error('MONGODB_URI environment variable is missing or empty.'));
    }

    MongoClient.connect(connectionString)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database.db('health_clinic_db');
};

module.exports = {
    initDb,
    getDatabase,
};