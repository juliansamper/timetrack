import express from 'express';
const router = express.Router();

const SecurityController = require('../controllers/SecurityController');

/**
 * @swagger
 * /security/login:
 *  post:
 *      summary: login a user.
 *      tags: [Security]
 *      requestBody:
 *          description: Security object to login.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SecurityLogin'
 *      responses:
 *          200:
 *              description: The access (Token) requested.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SecurityToken'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
router.post('/login', SecurityController.login);




module.exports = router;