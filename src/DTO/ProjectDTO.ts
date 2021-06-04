/**
 * @swagger
 * components:
 *  schemas:
 *      ProjectInput:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the activity.
 *              uid:
 *                  type: string
 *                  description: The user id related to the project.
 *          example:
 *              name: Qrvey test
 *              uid: jsamper123
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Project:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the activity.
 *              name:
 *                  type: string
 *                  description: The name of the activity.
 *              uid:
 *                  type: string
 *                  description: The user id related to the project.
 *          example:
 *              id: qrvproject_js1124
 *              name: Qrvey test
 *              uid: jsamper123
 */
export class ProjectDTO {
    id: string;
    name: string;
    uid: string;
}