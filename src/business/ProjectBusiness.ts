const _ = require("lodash");
const { LudyConsole } = require("../utils/LudyConsole");
const ErrorHandler = require('../utils/ErrorHandler');

const Project = require('../models/ProjectModel');

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ProjectDTO } from '../DTO/ProjectDTO';
import { ResponseDTO } from "../DTO/ResponseDTO";

function template(user: string, data: any) {
    return new Promise((resolve: any, reject: any) => {
        try {

            resolve(data);

        } catch (error) {
            reject(ErrorHandler.getError(error));
        }
    });
}

function getProject(userId: string) {
    return new Promise((resolve: any, reject: any) => {
        try {

            Project.find(/*{ uid: userId }*/)
                .then(function (data: ProjectDTO) {
                    resolve(data);
                })
                .catch(function (error) {
                    reject(ErrorHandler.getError(error));
                });

        } catch (error) {
            reject(ErrorHandler.getError(error));
        }
    });
}

function getProjectById(userId: string, id: string) {
    return new Promise((resolve: any, reject: any) => {
        try {

        Project.findOne({ _id: id/*, uid: userId*/ })
                .then(function (data: ProjectDTO) {
                    if (data)
                        resolve(data);
                    else {
                        let response: ResponseDTO = new ResponseDTO();

                        response.code = '404';
                        response.message = `The project (${id}) do not exist!`;
                        response.detail = 'NOT FOUND';
                        response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

                        reject(response);
                    }
                })
                .catch(function (error) {
                    reject(ErrorHandler.getError(error));
                });

        } catch (error) {
            reject(ErrorHandler.getError(error));
        }
    });
}

function addProject(userId: string, project: ProjectDTO) {
    return new Promise((resolve: any, reject: any) => {
        try {

            //project.uid = userId;
            Project.create(project)
                .then(function (data: ProjectDTO) {
                    resolve(data);
                })
                .catch(function (error) {
                    reject(ErrorHandler.getError(error));
                });

        } catch (error) {
            reject(ErrorHandler.getError(error));
        }
    });
}

function updateProjectById(userId: string, id: string, project: ProjectDTO) {
    return new Promise((resolve: any, reject: any) => {
        try {

            Project.findByIdAndUpdate(id, project, { new: true, useFindAndModify: false })
                .then(function (data: ProjectDTO) {
                    if (data)
                        resolve(data);
                    else {
                        let response: ResponseDTO = new ResponseDTO();

                        response.code = '404';
                        response.message = `The project (${id}) do not exist!`;
                        response.detail = 'NOT FOUND';
                        response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

                        reject(response);
                    }
                })
                .catch(function (error) {
                    reject(ErrorHandler.getError(error));
                });

        } catch (error) {
            reject(error);
        }
    });
}

function deleteProjectById(userId: string, id: string) {
    return new Promise((resolve: any, reject: any) => {
        try {

            Project.findByIdAndDelete({ _id: id })
                .then(function (data: ProjectDTO) {
                    if (data) {
                        let response: ResponseDTO = new ResponseDTO();

                        response.code = '204';
                        response.message = `The project (${id}) was deleted successfully!`;
                        response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

                        resolve(data);
                    } else {
                        let response: ResponseDTO = new ResponseDTO();

                        response.code = '404';
                        response.message = `The project (${id}) do not exist!`;
                        response.detail = 'NOT FOUND';
                        response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

                        reject(response);
                    }
                })
                .catch(function (error) {
                    reject(ErrorHandler.getError(error));
                });

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    template,
    getProject,
    getProjectById,
    addProject,
    updateProjectById,
    deleteProjectById
};
