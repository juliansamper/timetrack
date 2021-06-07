import request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../server';
import moment from 'moment';
const mongoose = require('mongoose');

let server: Express;

let token: string;
let project_id: string;

beforeAll(async () => {
    server = await createServer();
    let response: any = await request(server)
                                .post(`/api/v1/security/login`)
                                .set('Accept', 'application/json')
                                .send({user:'jsamper', password:'js123'});
    token = response.body.token;
});

afterAll(done => {
    mongoose.connection.close();
    done();
  });

describe('GET api/v1/project - Get a list of Projects', () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .get(`/api/v1/project`)
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
            .get(`/api/v1/project`)
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


describe('GET api/v1/project/:project_id - Get Project by Id', () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .get(`/api/v1/project/`)
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

    it('should return 404 & project not found with project_id: 100000000000000000000002', done => {
        request(server)
            .get(`/api/v1/project/100000000000000000000002`)
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

    it('should return 500 & invalid response with invalid format(ObjectId) for project_id: a', done => {
        request(server)
            .get(`/api/v1/project/a`)
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

    it('should return 200 & valid response with project_id: 60b9b4842b8051815b4e5fa8', done => {
        request(server)
            .get(`/api/v1/project/60b9b4842b8051815b4e5fa8`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body._id).toBe('60b9b4842b8051815b4e5fa8');
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('name');
                done();
            })
    });

});


describe('POST api/v1/project - Add a Project', () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .post(`/api/v1/project`)
            .set('Accept', 'application/json')
            .send({
                name: "Project x"
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

    it('should return 400 & bad request for missing project name', done => {
        request(server)
            .post(`/api/v1/project`)
            .set({ "Authorization": `Bearer ${token}` })
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

    it('should return 201 & valid response for {name: Project X}', done => {
        request(server)
            .post(`/api/v1/project`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                name: "Project X"
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body.name).toBe('Project X');
                project_id = res.body._id;
                process.env.project_id = res.body._id;
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('name');
                done();
            })
    });

});


describe(`PUT api/v1/project - Update a Project with {name:"Test updated"}`, () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .put(`/api/v1/project/${project_id}`)
            .set('Accept', 'application/json')
            .send({
                name: "Test updated"
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

    it(`should return 400 & bad request for missing project name`, done => {
        request(server)
            .put(`/api/v1/project/${project_id}`)
            .set({ "Authorization": `Bearer ${token}` })
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

    it('should return 404 & project not found with project_id: 100000000000000000000002', done => {
        request(server)
            .get(`/api/v1/project/100000000000000000000002`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                name: "Test updated"
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

    it('should return 500 & bad request with invalid format(ObjectId) for project_id: a', done => {
        request(server)
            .put(`/api/v1/project/a`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                name: "Test updated"
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

    it(`should return 200 & valid response with {name: "Test updated"}`, done => {
        request(server)
            .put(`/api/v1/project/${project_id}`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .send({
                name: "Test updated"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body._id).toBe(project_id);
                expect(res.body.name).toBe('Test updated');
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('name');
                done();
            })
    });

});


describe(`DELETE api/v1/project - delete a project`, () => {

    it('should return 401 & invalid token', done => {
        request(server)
            .delete(`/api/v1/project/${project_id}`)
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

    it('should return 404 & project not found with project_id: 100000000000000000000002', done => {
        request(server)
            .delete(`/api/v1/project/100000000000000000000002`)
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

    it('should return 500 & bad request with invalid format(ObjectId) for project_id: a', done => {
        request(server)
            .delete(`/api/v1/project/a`)
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
            .delete(`/api/v1/project/${project_id}`)
            .set({ "Authorization": `Bearer ${token}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeDefined();
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('name');
                done();
            })
    });

});