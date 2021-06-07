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
    start: Date;
    stop: Date;
    duration: string;
    at: Date;
    uid: string;

    constructor(obj: any) {
        if (obj['_id'])
            this.id = obj['_id'];

        if (obj['name'])
            this.name = obj['name'];

        if (obj['project_id'])
            this.project_id = obj['project_id'];

        if (obj['start'])
            this.start = moment(obj['start'], "DD/MM/YYYY HH:mm:ss").toDate();

        if (obj['stop'])
            this.stop = moment(obj['stop'], "DD/MM/YYYY HH:mm:ss").toDate();

        if (obj['duration'])
            this.duration = obj['duration'];

        if (obj['at'])
            this.at = moment(obj['at'], "DD/MM/YYYY HH:mm:ss").toDate();
        else
            this.at = new Date();

        if (obj['uid'])
            this.uid = obj['uid'];
    }

    public getJson(): any {
        let _json: any = {};
        if (this.id)
            _json['_id'] = this.id;

        if (this.name)
            _json['name'] = this.name;

        if (this.project_id)
            _json['project_id'] = this.project_id;

        if (this.start)
            _json['start'] = moment(this.start).format("DD/MM/YYYY HH:mm:ss");

        if (this.stop)
            _json['stop'] = moment(this.stop).format("DD/MM/YYYY HH:mm:ss");

        if (this.duration)
            _json['duration'] = this.duration;

        if (this.at)
            _json['at'] = moment(this.at).format("DD/MM/YYYY HH:mm:ss");

        if (this.uid)
            _json['uid'] = this.uid;

        return _json;
    }
}