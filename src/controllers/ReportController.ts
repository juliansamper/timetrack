const _ = require('lodash');
const ErrorHandler = require('../utils/ErrorHandler');

import { ReportDTO } from '../DTO/ReportDTO';

const ReportBusiness = require('../business/ReportBusiness');


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
    getActivitiesByUser,
    getActivitiesByProject
}