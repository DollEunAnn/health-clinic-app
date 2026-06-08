// doctor.test.js
// Raphael Daveal | Health Clinic App | CSE 341

require('dotenv').config();
const request = require('supertest');
const app = require('../server');
const mongodb = require('../database/connect');

let dbClient;

beforeAll((done) => {
    mongodb.initDb((err, client) => {
        if (err) return done(err);
        dbClient = client;
        done();
    });
}, 30000);

afterAll((done) => {
    if (!dbClient) return done();
    dbClient.close().then(() => done()).catch(done);
});

describe('Doctor Routes', () => {
    describe('GET /doctors', () => {
        it('should return all doctors with a 200 status code', async () => {
            const res = await request(app).get('/doctors');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        }, 15000);
    });

    describe('GET /doctors/:id', () => {
        it('should return a single doctor with a 200 status code', async () => {
            const all = await request(app).get('/doctors');
            expect(all.statusCode).toBe(200);
            expect(Array.isArray(all.body)).toBe(true);
            expect(all.body.length).toBeGreaterThan(0);
            const id = all.body[0]._id;
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id');
        }, 15000);

        it('should return 400 for an invalid doctor ID', async () => {
            const res = await request(app).get('/doctors/invalidid');
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('message');
        }, 15000);

        it('should return 404 for a valid but non-existent doctor ID', async () => {
            const res = await request(app).get('/doctors/000000000000000000000000');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message');
        }, 15000);
    });
});