const _ = require('lodash');

/**
 * @swagger
 * components:
 *  schemas:
 *      SecurityLogin:
 *          type: object
 *          properties:
 *              user:
 *                  type: string
 *                  description: The username of the user.
 *              password:
 *                  type: string
 *                  description: The password of the user.
 *          example:
 *              user: jsamper
 *              password: js123
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      SecurityToken:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The user id of the user.
 *              user:
 *                  type: string
 *                  description: The username of the user.
 *              name:
 *                  type: string
 *                  description: The name of the user.
 *              rol:
 *                  type: string
 *                  description: The rol of the user.
 *              token:
 *                  type: string
 *                  description: The token of the user's session.
 *          example:
 *              id: qrvuser_js1124
 *              user: jsamper
 *              name: Julian Samper
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1bGlhbiBTYW1wZXIiLCJpYXQiOjE1MTYyMzkwMjIsInVpZCI6InFydnVzZXJfanMxMTI0Iiwicm9sIjoidXNlciJ9.jaZ-MWEMfFrN0BbDyrbXw5S_vOTlSnKLMeAjIZ7Emyg
 */
export class SecurityDTO {
    id: string;
    user: string;
    name: string;
    rol: string;
    token: string;

    constructor(obj: any) {
        this.id = _.get(obj,'_doc._id', '');
        this.user = _.get(obj,'_doc.user', '');
        this.name = _.get(obj,'_doc.name', '');
        this.rol = _.get(obj,'_doc.rol', '');
        this.token = _.get(obj,'_doc.token', '');
    }
}