const _ = require("lodash");
const { LudyConsole } = require("../utils/LudyConsole");
const ErrorHandler = require('../utils/ErrorHandler');

const Activity = require('../models/ActivityModel');

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ActivityDTO } from '../DTO/ActivityDTO';
import { ResponseDTO } from "../DTO/ResponseDTO";


function getActivity(userId: string) {
    return new Promise((resolve: any, reject: any) => {
        try {

            Activity.find({ uid: userId }).sort({ start: 1 })
                .then(function (data: ActivityDTO) {
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

function getActivityById(userId: string, id: string) {
    return new Promise((resolve: any, reject: any) => {
        try {

            Activity.findOne({ _id: id, uid: userId })
                .then(function (data: any) {
                    if (data)
                        resolve(data._doc as ActivityDTO);
                    else {
                        let response: ResponseDTO = new ResponseDTO();

                        response.code = '404';
                        response.message = `The activity (${id}) do not exist!`;
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

function startActivity(userId: string, activity: ActivityDTO) {
    return new Promise((resolve: any, reject: any) => {
        try {

            activity.uid = userId;
            Activity.create(activity)
                .then(function (data: any) {
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

// function restartActivityById(userId: string, id: string, activity: ActivityDTO) {
//     return new Promise((resolve: any, reject: any) => {
//         try {

//             Activity.findByIdAndUpdate(id, activity, { new: true, useFindAndModify: false })
//                 .then(function (data: ActivityDTO) {
//                     if (data)
//                         resolve(data);
//                     else {
//                         let response: ResponseDTO = new ResponseDTO();

//                         response.code = '404';
//                         response.message = `The activity (${id}) do not exist!`;
//                         response.detail = 'NOT FOUND';
//                         response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

//                         reject(response);
//                     }
//                 })
//                 .catch(function (error) {
//                     reject(ErrorHandler.getError(error));
//                 });

//         } catch (error) {
//             reject(error);
//         }
//     });
// }

function stopActivityById(userId: string, id: string, activity: ActivityDTO) {
    return new Promise((resolve: any, reject: any) => {
        try {

            Activity.findByIdAndUpdate(id, new ActivityDTO(activity), { new: true, useFindAndModify: false })
                .then(function (data: any) {
                    if (data)
                        resolve(data);
                    else {
                        let response: ResponseDTO = new ResponseDTO();

                        response.code = '404';
                        response.message = `The activity (${id}) do not exist!`;
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

function deleteActivityById(userId: string, id: string) {
    return new Promise((resolve: any, reject: any) => {
        try {

            Activity.findByIdAndDelete({ _id: id })
                .then(function (data: ActivityDTO) {
                    if (data) {
                        let response: ResponseDTO = new ResponseDTO();

                        response.code = '204';
                        response.message = `The activity (${id}) was deleted successfully!`;
                        response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

                        resolve(data);
                    } else {
                        let response: ResponseDTO = new ResponseDTO();

                        response.code = '404';
                        response.message = `The activity (${id}) do not exist!`;
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
    getActivity,
    getActivityById,
    startActivity,
    // restartActivityById,
    stopActivityById,
    deleteActivityById
};
