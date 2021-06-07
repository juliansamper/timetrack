import request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../server';
const mongoose = require('mongoose');

let server: Express;

let token: string;
let activity_id: string;

beforeAll(async () => {
    server = await createServer();
    let response: any = await request(server)
                                .post(`/api/v1/security/login`)
                                .set('Accept', 'application/json')
                                .send({ user: 'jsamper', password: 'js123' });
    token = response.body.token;
});

afterAll(done => {
    mongoose.connection.close();
    done();
});


describe('GET api/v1/activity - Get a list of Activities', () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .get(`/api/v1/activity`)
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

    it('should return 200 & valid response', done => {
        request(server)
            .get(`/api/v1/activity`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body[0]).toHaveProperty('_id');
                expect(res.body[0]).toHaveProperty('name');
                done();
            })
    });

});


describe('GET api/v1/activity/:activity_id - Get Activity by Id', () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .get(`/api/v1/activity/`)
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

    it('should return 404 & activity not found with activity_id: 100000000000000000000002', done => {
        request(server)
            .get(`/api/v1/activity/100000000000000000000002`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.detail).toBe('NOT FOUND');
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it('should return 500 & invalid response with invalid format(ObjectId) for activity_id: a', done => {
        request(server)
            .get(`/api/v1/activity/a`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it('should return 200 & valid response with activity_id: 60bd01dfe3afe345c1d1ce2f', done => {
        request(server)
            .get(`/api/v1/activity/60bd01dfe3afe345c1d1ce2f`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body._id).toBe('60bd01dfe3afe345c1d1ce2f');
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('name');
                done();
            })
    });

});


describe('POST api/v1/activity - Add a Activity', () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .post(`/api/v1/activity`)
            .set('Accept', 'application/json')
            .send({
                name: "New activity",
                project_id: "60b9b4bb2b8051815b4e5fab",
                start: "06/06/2021 10:42:27",
                stop: "06/06/2021 11:17:16",
                duration: "21:59:43",
                at: "06/06/2021 11:17:16",
                uid: "60b9b3cee3afe345c1af1b21"
            })
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

    it('should return 400 & bad request for missing activity start datetime', done => {
        request(server)
            .post(`/api/v1/activity/start`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                project_id: "60b9b4bb2b8051815b4e5fab",
                stop: "06/06/2021 11:17:16",
                duration: "21:59:43",
                at: "06/06/2021 11:17:16",
                uid: "60b9b3cee3afe345c1af1b21"
            })
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

    it('should return 201 & valid response for { project_id: "60b9b4bb2b8051815b4e5fab", start: "06/06/2021 10:42:27", stop: "06/06/2021 11:17:16", duration: "21:59:43", at: "06/06/2021 11:17:16", uid: "60b9b3cee3afe345c1af1b21" }', done => {
        request(server)
            .post(`/api/v1/activity/start`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                project_id: "60b9b4bb2b8051815b4e5fab",
                start: "06/06/2021 10:42:27",
                stop: "06/06/2021 11:17:16",
                duration: "0:34:49",
                at: "06/06/2021 11:17:16",
                uid: "60b9b3cee3afe345c1af1b21"
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('project_id');
                expect(res.body).toHaveProperty('start');
                expect(res.body).toHaveProperty('stop');
                expect(res.body).toHaveProperty('duration');
                expect(res.body).toHaveProperty('at');
                expect(res.body).toHaveProperty('uid');
                done();
            })
    });

    it('should return 201 & valid response for { name: "Testing the Time Tracking API", project_id: "60b9b4bb2b8051815b4e5fab", start: "31/07/2021 10:42:27", duration: "00:00:00",at: "31/07/2021 10:42:27", uid: "60b9b3cee3afe345c1af1b21" }', done => {
        request(server)
            .post(`/api/v1/activity/start`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                name: "Testing the Time Tracking API",
                project_id: "60b9b4bb2b8051815b4e5fab",
                start: "31/07/2021 10:42:27",
                duration: "00:00:00",
                at: "31/07/2021 10:42:27",
                uid: "60b9b3cee3afe345c1af1b21"
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                activity_id = res.body._id;
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('name');
                expect(res.body).toHaveProperty('project_id');
                expect(res.body).toHaveProperty('start');
                expect(res.body).toHaveProperty('duration');
                expect(res.body).toHaveProperty('at');
                expect(res.body).toHaveProperty('uid');
                done();
            })
    });

});


describe(`PUT api/v1/activity - Update an Activity with { stop: "31/07/2021 20:30:25", duration: "9:47:58", at: "31/07/2021 20:30:25" }`, () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .put(`/api/v1/activity/stop/${activity_id}`)
            .set('Accept', 'application/json')
            .send({
                stop: "31/07/2021 20:30:25",
                duration: "9:47:58",
                at: "31/07/2021 20:30:25"
            })
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

    it(`should return 400 & bad request for missing activity stop datetime`, done => {
        request(server)
            .put(`/api/v1/activity/stop/${activity_id}`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                duration: "9:47:58",
                at: "31/07/2021 20:30:25"
            })
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

    it('should return 404 & activity not found with activity_id: 100000000000000000000002', done => {
        request(server)
            .put(`/api/v1/activity/stop/100000000000000000000002`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                stop: "31/07/2021 20:30:25",
                duration: "9:47:58",
                at: "31/07/2021 20:30:25"
            })
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.detail).toBe('NOT FOUND');
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it('should return 500 & bad request with invalid format(ObjectId) for activity_id: a', done => {
        request(server)
            .put(`/api/v1/activity/stop/a`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                stop: "31/07/2021 20:30:25",
                duration: "9:47:58",
                at: "31/07/2021 20:30:25"
            })
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it(`should return 200 & valid response with { stop: "31/07/2021 20:30:25", duration: "9:47:58", at: "31/07/2021 20:30:25" }`, done => {
        request(server)
            .put(`/api/v1/activity/stop/${activity_id}`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                stop: "31/07/2021 20:30:25",
                duration: "9:47:58",
                at: "31/07/2021 20:30:25"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body._id).toBe(activity_id);
                expect(res.body.stop).toBe('31/07/2021 20:30:25');
                expect(res.body.duration).toBe('9:47:58');
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('name');
                expect(res.body).toHaveProperty('project_id');
                expect(res.body).toHaveProperty('start');
                expect(res.body).toHaveProperty('duration');
                expect(res.body).toHaveProperty('at');
                expect(res.body).toHaveProperty('uid');
                done();
            })
    });

});


describe(`DELETE api/v1/activity - delete an activity`, () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .delete(`/api/v1/activity/${activity_id}`)
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

    it('should return 404 & activity not found with activity_id: 100000000000000000000002', done => {
        request(server)
            .delete(`/api/v1/activity/100000000000000000000002`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.detail).toBe('NOT FOUND');
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it('should return 500 & bad request with invalid format(ObjectId) for activity_id: a', done => {
        request(server)
            .delete(`/api/v1/activity/a`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body).toHaveProperty('code');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('detail');
                expect(res.body).toHaveProperty('datetime');
                done();
            })
    });

    it(`should return 200 & valid response`, done => {
        request(server)
            .delete(`/api/v1/activity/${activity_id}`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body).toHaveProperty('_id');
                expect(res.body._id).toBe(activity_id);
                done();
            })
    });

});