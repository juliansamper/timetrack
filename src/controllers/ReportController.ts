const _ = require('lodash');
const ErrorHandler = require('../utils/ErrorHandler');

import { ReportDTO } from '../DTO/ReportDTO';

const ReportBusiness = require('../business/ReportBusiness');


function template(req, res, next) {
    try {

        let id: string = _.get(req.params, "activityId", "");

        let request: any = {
            code: "200",
            msg: "Proceso ejecutado correctamente.",
            url: req.originalUrl,
            user: ''+req.user,
            params: ''+req.params,
            body: ''+req.body
        };

        ReportBusiness.template(req.user, request)
            .then(function (data: any) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function getActivitiesByUser(req, res, next) {
    try {

        ReportBusiness.getActivitiesByUser(req.user)
            .then(function (data: any[]) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function getActivitiesByProject(req, res, next) {
    try {

        ReportBusiness.getActivitiesByProject(req.user)
            .then(function (data: any[]) {
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
    getActivitiesByUser,
    getActivitiesByProject
}