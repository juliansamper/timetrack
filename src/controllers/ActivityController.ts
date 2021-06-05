const _ = require('lodash');
const ErrorHandler = require('../utils/ErrorHandler');

import moment from 'moment';
import { ActivityDTO } from '../DTO/ActivityDTO';
import { ResponseDTO } from '../DTO/ResponseDTO';

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
                return;
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
        return;
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

        if(!id) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The project id is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        ActivityBusiness.getActivityById(req.user, id)
            .then(function (data: any) {
                res.status(200).send(new ActivityDTO(data));
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

function startActivity(req, res, next) {
    try {

        let body: ActivityDTO = req.body;

        if(!_.get(body, 'project_id', '')) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The project id is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        if(!_.get(body, 'start', '')) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The activity start datetime is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        if(!_.get(body, 'duration', '')) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The activity duration is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        ActivityBusiness.startActivity(req.user, body)
            .then(function (data: ActivityDTO) {
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

        if(!id) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The project id is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        if(!_.get(body, 'stop', '')) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The activity stop datetime is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        if(!_.get(body, 'duration', '')) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The activity duration is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        ActivityBusiness.stopActivityById(req.user, id, body)
            .then(function (data: ActivityDTO) {
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

function deleteActivityById(req, res, next) {
    try {

        let id: string = _.get(req.params, "activityId", "");

        if(!id) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The project id is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        ActivityBusiness.deleteActivityById(req.user, id)
            .then(function (data: ActivityDTO) {
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
    template,
    getActivity,
    getActivityById,
    startActivity,
    // restartActivityById,
    stopActivityById,
    deleteActivityById
}