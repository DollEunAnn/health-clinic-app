// prescription.test.js
// Boiketlo Nzimande | Health Clinic App | CSE 341

require('dotenv').config();
const request = require('supertest');
const app = require('../server');
const mongodb = require('../database/connect');

beforeAll((done) => {
    mongodb.initDb((err) => {
        if (err) done(err);
        else done();
    });
}, 30000);

afterAll((done) => {
    done();
});

describe('Prescription Routes', () => {
    describe('GET /prescriptions', () => {
        it('should return all prescriptions with a 200 status code', async () => {
            const res = await request(app).get('/prescriptions');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        }, 15000);
    });

    describe('GET /prescriptions/:id', () => {
        it('should return a single prescription with a 200 status code', async () => {
            const all = await request(app).get('/prescriptions');
            const id = all.body[0]._id;
            const res = await request(app).get(`/prescriptions/${id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id');
        }, 15000);

        it('should return 400 for an invalid prescription ID', async () => {
            const res = await request(app).get('/prescriptions/invalidid');
            expect(res.statusCode).toBe(400);
        }, 15000);

        it('should return 404 for a valid but non-existent prescription ID', async () => {
            const res = await request(app).get('/prescriptions/000000000000000000000000');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message');
        }, 15000);
    });
});