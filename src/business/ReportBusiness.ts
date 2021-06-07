const _ = require("lodash");
const { LudyConsole } = require("../utils/LudyConsole");
const ErrorHandler = require('../utils/ErrorHandler');

const Report = require('../models/ReportModel');
const Activity = require('../models/ActivityModel');
const Project = require('../models/ProjectModel');
const User = require('../models/UserModel');

import * as moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ReportDTO } from '../DTO/ReportDTO';
import { ActivityDTO } from '../DTO/ActivityDTO';
import { ResponseDTO } from "../DTO/ResponseDTO";


function getActivitiesByUser(userId: string) {
    return new Promise((resolve: any, reject: any) => {
        try {

            Project.aggregate(
                [
                    {
                        $lookup:
                        {
                            from: 'users',
                            as: 'users',
                            let: { projectId: "$_id" },
                            pipeline: [
                                {
                                    $lookup:
                                    {
                                        from: 'activities',
                                        as: 'activities',
                                        let: { userId: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            { $eq: ["$uid", "$$userId"] },
                                                            { $eq: ["$project_id", "$$projectId"] }
                                                        ]
                                                    }
                                                }
                                            },
                                            {
                                                $project: {
                                                    duration: 1
                                                    // __v: 0
                                                }
                                            }
                                            // ,
                                            // {
                                            //     $group: {
                                            //         _id: "$_id",
                                            //         count: { $sum: 1 },
                                            //         totalDuration: {
                                            //             $accumulator: {
                                            //                 init: function () {
                                            //                     return { cont: 0/*'00:00:00'*/ }
                                            //                 },
                                            //                 accumulate: function (state, aDuration) {
                                            //                     return {
                                            //                         cont: state.count + 1
                                            //                         // durationSum: moment.utc((moment.duration(state.durationSum).add(moment.duration(_duration)))
                                            //                         //     .as('milliseconds')).format('HH:mm:ss')
                                            //                     }
                                            //                 },
                                            //                 accumulateArgs: ['$duration'],
                                            //                 merge: function (state1, state2) {
                                            //                     return {
                                            //                         cont: state1.cont + state2.cont
                                            //                         // durationSum: moment.utc((moment.duration(state1.durationSum).add(moment.duration(state2.durationSum)))
                                            //                         //     .as('milliseconds')).format('HH:mm:ss')
                                            //                     }
                                            //                 },
                                            //                 finalize: function (state) {
                                            //                     return state.cont
                                            //                 },
                                            //                 lang: 'js'
                                            //             }
                                            //         }
                                            //     }
                                            // }
                                        ]
                                    }
                                },
                                {
                                    $project: {
                                        password: 0,
                                        rol: 0,
                                        __v: 0
                                    }
                                }
                            ]
                        }
                    }
                ]
            ).option({ serializeFunctions: true })
                .then(function (data: any[]) {
                    data.forEach(user => {
                        user.users.forEach((activities, index, _activities) => {
                            if (activities.activities.length > 1) {
                                // _activities[index].total = activities.activities.reduce(function (activity1, activity2) {
                                //     console.log("Activity 1: "+activity1.duration);
                                //     console.log("Activity 2: "+activity2.duration);
                                //     let duration: string = moment.utc((moment.duration(activity1.duration).add(moment.duration(activity2.duration)))
                                //                             .as('milliseconds')).format('HH:mm:ss');
                                //     console.log('Duration Result: '+duration);
                                //     return duration;
                                // });
                                _activities[index].total = "00:00:00";
                                activities.activities.forEach(activity => {
                                    _activities[index].total = moment.utc((moment.duration(_activities[index].total).add(moment.duration(activity.duration)))
                                                                .as('milliseconds')).format('HH:mm:ss');
                                });
                            } else if (activities.activities.length > 0) {
                                _activities[index].total = activities.activities[0].duration;
                            } else {
                                _activities[index].total = 0;
                            }
                        });
                    });
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

function getActivitiesByProject(userId: string) {
    return new Promise((resolve: any, reject: any) => {
        try {

            User.aggregate(
                [
                    {
                        $lookup:
                        {
                            from: 'projects',
                            as: 'projects',
                            let: { userId: "$_id" },
                            pipeline: [
                                {
                                    $lookup:
                                    {
                                        from: 'activities',
                                        as: 'activities',
                                        let: { projectId: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            { $eq: ["$uid", "$$userId"] },
                                                            { $eq: ["$project_id", "$$projectId"] }
                                                        ]
                                                    }
                                                }
                                            },
                                            {
                                                $project: {
                                                    duration: 1
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $project: {
                            password: 0,
                            rol: 0,
                            __v: 0
                        }
                    }
                ]
            ).option({ serializeFunctions: true })
                .then(function (data: any[]) {
                    data.forEach(project => {
                        project.projects.forEach((activities, index, _activities) => {
                            if (activities.activities.length > 1) {
                                // _activities[index].total = activities.activities.reduce(function (activity1, activity2) {
                                //     console.log("Activity 1: "+activity1.duration);
                                //     console.log("Activity 2: "+activity2.duration);
                                //     let duration: string = moment.utc((moment.duration(activity1.duration).add(moment.duration(activity2.duration)))
                                //                             .as('milliseconds')).format('HH:mm:ss');
                                //     console.log('Duration Result: '+duration);
                                //     return duration;
                                // });
                                _activities[index].total = "00:00:00";
                                activities.activities.forEach(activity => {
                                    _activities[index].total = moment.utc((moment.duration(_activities[index].total).add(moment.duration(activity.duration)))
                                                                .as('milliseconds')).format('HH:mm:ss');
                                });
                            } else if (activities.activities.length > 0) {
                                _activities[index].total = activities.activities[0].duration;
                            } else {
                                _activities[index].total = 0;
                            }
                        });
                    });
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




module.exports = {
    getActivitiesByUser,
    getActivitiesByProject
};
