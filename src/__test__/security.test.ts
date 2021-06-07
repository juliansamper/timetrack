import request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../server';
const mongoose = require('mongoose');

let server: Express;

beforeAll(async () => {
    server = await createServer();
});

afterAll(done => {
    mongoose.connection.close();
    done();
  });

describe('POST api/v1/security/login', () => {

    it('should return 200 & valid response for {user:"jsamper",password:"js123"}', done => {
        request(server)
            .post(`/api/v1/security/login`)
            .set('Accept', 'application/json')
            .send({user:'jsamper', password:'js123'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.user).toBe('jsamper');
                expect(res.body).toHaveProperty('id');
                expect(res.body).toHaveProperty('user');
                expect(res.body).toHaveProperty('name');
                expect(res.body).toHaveProperty('rol');
                expect(res.body).toHaveProperty('token');
                done();
            })
    });

    it('should return 401 & invalid credentials for {user:"jsamper",password:"js1234"}', done => {
        request(server)
            .post(`/api/v1/security/login`)
            .set('Accept', 'application/json')
            .send({user:'jsamper', password:'js1234'})
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.detail).toBe('INVALID CREDENTIALS');
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it('should return 400 & bad request for {user:"jsamper"}', done => {
        request(server)
            .post(`/api/v1/security/login`)
            .set('Accept', 'application/json')
            .send({user:'jsamper'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.detail).toBe('BAD REQUEST');
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it('should return 400 & bad request for {}', done => {
        request(server)
            .post(`/api/v1/security/login`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.detail).toBe('BAD REQUEST');
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });


});