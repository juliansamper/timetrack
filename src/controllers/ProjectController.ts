const _ = require('lodash');
const ErrorHandler = require('../utils/ErrorHandler');

import moment from 'moment';
import { ProjectDTO } from '../DTO/ProjectDTO';
import { ResponseDTO } from '../DTO/ResponseDTO';

const ProjectBusiness = require('../business/ProjectBusiness');


function getProject(req, res, next) {
    try {

        ProjectBusiness.getProject(req.user)
            .then(function (data: ProjectDTO[]) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
                return;
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
        return;
    }
}

function getProjectById(req, res, next) {
    try {

        let id: string = _.get(req.params, "projectId", "");

        if(!id) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The project id is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        ProjectBusiness.getProjectById(req.user, id)
            .then(function (data: ProjectDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
                return;
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
        return;
    }
}

function addProject(req, res, next) {
    try {

        let body: ProjectDTO = req.body;

        if(!_.get(body, 'name', '')) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The project name is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        ProjectBusiness.addProject(req.user, body)
            .then(function (data: ProjectDTO) {
                res.status(201).send(data);
            })
            .catch(error => {
                next(error);
                return;
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
        return;
    }
}

function updateProjectById(req, res, next) {
    try {

        let id: string = _.get(req.params, "projectId", "");
        let body: ProjectDTO = req.body;

        if(!id) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The parameter project id is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        if(!_.get(body, 'name', '')) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The project name is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        ProjectBusiness.updateProjectById(req.user, id, body)
            .then(function (data: ProjectDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
                return;
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
        return;
    }
}

function deleteProjectById(req, res, next) {
    try {

        let id: string = _.get(req.params, "projectId", "");

        if(!id) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The parameter project id is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        ProjectBusiness.deleteProjectById(req.user, id)
            .then(function (data: ProjectDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
                return;
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
        return;
    }
}




module.exports = {
    getProject,
    addProject,
    getProjectById,
    updateProjectById,
    deleteProjectById
}