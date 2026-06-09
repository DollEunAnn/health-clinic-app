// appointment.test.js
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

describe('Appointment Routes', () => {
    describe('GET /appointments', () => {
        it('should return all appointments with a 200 status code', async () => {
            const res = await request(app).get('/appointments');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        }, 15000);
    });

    describe('GET /appointments/:id', () => {
        it('should return a single appointment with a 200 status code', async () => {
            const all = await request(app).get('/appointments');
            const id = all.body[0]._id;
            const res = await request(app).get(`/appointments/${id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id');
        }, 15000);

        it('should return 400 for an invalid appointment ID', async () => {
            const res = await request(app).get('/appointments/invalidid');
            expect(res.statusCode).toBe(400);
        }, 15000);

        it('should return 404 for a valid but non-existent appointment ID', async () => {
            const res = await request(app).get('/appointments/000000000000000000000000');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message');
        }, 15000);
    });
});