const _ = require('lodash');
const ErrorHandler = require('../utils/ErrorHandler');

import { ProjectDTO } from '../DTO/ProjectDTO';

const ProjectBusiness = require('../business/ProjectBusiness');


function template(req, res, next) {
    try {

        let id: string = _.get(req.params, "projectId", "");

        let request: any = {
            code: "200",
            msg: "Proceso ejecutado correctamente.",
            url: req.originalUrl,
            user: ''+req.user,
            params: ''+req.params,
            body: ''+req.body
        };

        ProjectBusiness.template(req.user, request)
            .then(function (data: ProjectDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function getProject(req, res, next) {
    try {

        ProjectBusiness.getProject(req.user)
            .then(function (data: ProjectDTO[]) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function getProjectById(req, res, next) {
    try {

        let id: string = _.get(req.params, "projectId", "");

        ProjectBusiness.getProjectById(req.user, id)
            .then(function (data: ProjectDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function addProject(req, res, next) {
    try {

        let body: ProjectDTO = req.body;

        ProjectBusiness.addProject(req.user, body)
            .then(function (data: ProjectDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function updateProjectById(req, res, next) {
    try {

        let id: string = _.get(req.params, "projectId", "");
        let body: ProjectDTO = req.body;

        ProjectBusiness.updateProjectById(req.user, id, body)
            .then(function (data: ProjectDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function deleteProjectById(req, res, next) {
    try {

        let id: string = _.get(req.params, "projectId", "");

        ProjectBusiness.deleteProjectById(req.user, id)
            .then(function (data: ProjectDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}




module.exports = {
    template,
    getProject,
    addProject,
    getProjectById,
    updateProjectById,
    deleteProjectById
}