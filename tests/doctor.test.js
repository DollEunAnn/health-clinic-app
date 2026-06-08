// doctor.test.js
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

describe('Doctor Routes', () => {
    describe('GET /doctors', () => {
        it('should return all doctors with a 200 status code', async () => {
            const res = await request(app).get('/doctors');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /doctors/:id', () => {
        it('should return a single doctor with a 200 status code', async () => {
            const all = await request(app).get('/doctors');
            const id = all.body[0]._id;
            const res = await request(app).get(`/doctors/${id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id');
        });

        it('should return 400 for an invalid doctor ID', async () => {
            const res = await request(app).get('/doctors/invalidid');
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('message');
        });

        it('should return 404 for a valid but non-existent doctor ID', async () => {
            const res = await request(app).get('/doctors/000000000000000000000000');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message');
        });
    });
});