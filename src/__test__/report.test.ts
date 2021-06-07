import request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../server';
const mongoose = require('mongoose');

let server: Express;

let validToken: string;
let invalidToken: string;

beforeAll(async () => {
    server = await createServer();
    let response: any;
    
    response = await request(server)
                                .post(`/api/v1/security/login`)
                                .set('Accept', 'application/json')
                                .send({ user: 'jsamper', password: 'js123' });
    invalidToken = response.body.token;
    
    response = await request(server)
                                .post(`/api/v1/security/login`)
                                .set('Accept', 'application/json')
                                .send({ user: 'qrvey', password: 'qrvey' });
    validToken = response.body.token;
});

afterAll(done => {
    mongoose.connection.close();
    done();
});


describe('GET api/v1/report/byuser - Get a report of the activities grouped by projects->users', () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .get(`/api/v1/report/byuser`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.detail).toBe('INVALID TOKEN');
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it('should return 403 & forbidden resource - logged in as jsamper (rol: user)', done => {
        request(server)
            .get(`/api/v1/report/byuser`)
            .set({ "Authorization": `Bearer ${invalidToken}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.detail).toBe('FORBIDDEN');
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it('should return 200 & valid response - logged in as qrvey (rol: admin)', done => {
        request(server)
            .get(`/api/v1/report/byuser`)
            .set({ "Authorization": `Bearer ${validToken}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                done();
            })
    });

    it('should return 200 & valid response - Group of project "Qrvey test" and user "jsamper" should get a total duration of "06:22:34" with 3 activities', done => {
        request(server)
            .get(`/api/v1/report/byuser`)
            .set({ "Authorization": `Bearer ${validToken}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body[0].users[1].total).toBe('06:22:34');
                expect(res.body[0].users[1].activities).toHaveLength(3);
                done();
            })
    });

});


describe('GET api/v1/report/byproject - Get a report of the activities grouped by users->projects', () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .get(`/api/v1/report/byproject`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.detail).toBe('INVALID TOKEN');
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it('should return 403 & forbidden resource - logged in as jsamper (rol: user)', done => {
        request(server)
            .get(`/api/v1/report/byproject`)
            .set({ "Authorization": `Bearer ${invalidToken}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.detail).toBe('FORBIDDEN');
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it('should return 200 & valid response - logged in as qrvey (rol: admin)', done => {
        request(server)
            .get(`/api/v1/report/byproject`)
            .set({ "Authorization": `Bearer ${validToken}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                done();
            })
    });

    it('should return 200 & valid response - Group of user "jsamper" and project "Qrvey test" should get a total duration of "06:22:34" with 3 activities', done => {
        request(server)
            .get(`/api/v1/report/byuser`)
            .set({ "Authorization": `Bearer ${validToken}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body[0].users[1].total).toBe('06:22:34');
                done();
            })
    });

});