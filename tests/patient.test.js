// patient.test.js
// Raphael Daveal | Health Clinic App | CSE 341

const request = require('supertest');
const app = require('../server');
const mongodb = require('../database/connect');

beforeAll((done) => {
    mongodb.initDb((err) => {
        if (err) done(err);
        else done();
    });
});

afterAll((done) => {
    done();
});

describe('Patient Routes', () => {
    describe('GET /patients', () => {
        it('should return all patients with a 200 status code', async () => {
            const res = await request(app).get('/patients');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /patients/:id', () => {
        it('should return a single patient with a 200 status code', async () => {
            const all = await request(app).get('/patients');
            const id = all.body[0]._id;
            const res = await request(app).get(`/patients/${id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id');
        });

        it('should return 400 for an invalid patient ID', async () => {
            const res = await request(app).get('/patients/invalidid');
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('message');
        });

        it('should return 404 for a valid but non-existent patient ID', async () => {
            const res = await request(app).get('/patients/000000000000000000000000');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message');
        });
    });
});