const _ = require('lodash');
const ErrorHandler = require('../utils/ErrorHandler');

import { ActivityDTO } from '../DTO/ActivityDTO';

const ActivityBusiness = require('../business/ActivityBusiness');


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

        ActivityBusiness.template(req.user, request)
            .then(function (data: ActivityDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function getActivity(req, res, next) {
    try {

        ActivityBusiness.getActivity(req.user)
            .then(function (data: any[]) {
                let arrActivity: ActivityDTO[] = data.map(function(item) {
                    return new ActivityDTO(item);
                });
                res.status(200).send(arrActivity);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function getActivityById(req, res, next) {
    try {

        let id: string = _.get(req.params, "activityId", "");

        ActivityBusiness.getActivityById(req.user, id)
            .then(function (data: any) {
                res.status(200).send(new ActivityDTO(data));
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function startActivity(req, res, next) {
    try {

        let body: ActivityDTO = req.body;

        ActivityBusiness.startActivity(req.user, body)
            .then(function (data: ActivityDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

// function restartActivityById(req, res, next) {
//     try {

//         let id: string = _.get(req.params, "projectId", "");
//         let body: ActivityDTO = req.body;

//         ActivityBusiness.restartActivityById(req.user, id, body)
//             .then(function (data: ActivityDTO) {
//                 res.status(200).send(data);
//             })
//             .catch(error => {
//                 next(error);
//             });

//     } catch (error) {
//         next(ErrorHandler.getError(error));
//     }
// }

function stopActivityById(req, res, next) {
    try {

        let id: string = _.get(req.params, "activityId", "");
        let body: ActivityDTO = req.body;

        ActivityBusiness.stopActivityById(req.user, id, body)
            .then(function (data: ActivityDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function deleteActivityById(req, res, next) {
    try {

        let id: string = _.get(req.params, "activityId", "");

        ActivityBusiness.deleteActivityById(req.user, id)
            .then(function (data: ActivityDTO) {
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
    getActivity,
    getActivityById,
    startActivity,
    // restartActivityById,
    stopActivityById,
    deleteActivityById
}