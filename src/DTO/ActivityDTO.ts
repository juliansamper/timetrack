/**
 * @swagger
 * components:
 *  schemas:
 *      ActivityInput:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the activity.
 *              project_id:
 *                  type: string
 *                  description: The name of the project related to the activity.
 *              start:
 *                  type: string
 *                  description: The start date and time of the activity.
 *              stop:
 *                  type: string
 *                  description: The stop date and time of the activity.
 *              duration:
 *                  type: string
 *                  description: The duration of the activity.
 *              at:
 *                  type: string
 *                  description: The date and time the record has his last modification.
 *              uid:
 *                  type: string
 *                  description: The user id related to the activity.
 *          example:
 *              name: Coding Backend in Nodejs
 *              project_id: qrvproject_js1124
 *              start: 01/06/2021 10:25:17
 *              stop: 01/06/2021 11:30:25
 *              duration: 3:24:11
 *              at: 01/06/2021 11:30:25
 *              uid: jsamper123
 */

import moment from "moment";

/**
 * @swagger
 * components:
 *  schemas:
 *      Activity:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the activity.
 *              name:
 *                  type: string
 *                  description: The name of the activity.
 *              project_id:
 *                  type: string
 *                  description: The name of the project related to the activity.
 *              start:
 *                  type: string
 *                  description: The start date and time of the activity.
 *              stop:
 *                  type: string
 *                  description: The stop date and time of the activity.
 *              duration:
 *                  type: string
 *                  description: The duration of the activity.
 *              at:
 *                  type: string
 *                  description: The date and time the record has his last modification.
 *              uid:
 *                  type: string
 *                  description: The user id related to the activity.
 *          example:
 *              id: qrvactivity_js1124
 *              name: Coding Backend in Nodejs
 *              project_id: qrvproject_js1124
 *              start: 01/06/2021 10:25:17
 *              stop: 01/06/2021 11:30:25
 *              duration: 3:24:11
 *              at: 01/06/2021 11:30:25
 *              uid: jsamper123
 */
export class ActivityDTO {
    id: string;
    name: string;
    project_id: string;
    start: string;
    stop: string;
    duration: string;
    at: string;
    uid: string;

    constructor(obj: any) {
        this.id = obj['_id'];
        this.name = obj['name'];
        this.project_id = obj['project_id'];
        this.start = moment(obj['start']).format("DD/MM/YYYY HH:mm:ss");
        this.stop = moment(obj['stop']).format("DD/MM/YYYY HH:mm:ss");
        this.duration = obj['duration'];
        this.at = moment(obj['at']).format("DD/MM/YYYY HH:mm:ss");
        this.uid = obj['uid'];
    }
}