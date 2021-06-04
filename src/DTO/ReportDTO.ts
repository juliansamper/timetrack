/**
 * @swagger
 * components:
 *  schemas:
 *      Report:
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
export class ReportDTO {
    id: string;
    name: string;
    project_id: string;
    project_name: string;
    duration: string;
    uid: string;
    user: string;
}