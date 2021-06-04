import express from 'express';
const router = express.Router();

const ReportController = require('../controllers/ReportController');

/**
 * @swagger
 * /report/byuser:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a list of all activities grouped by user.
 *      tags: [Reports]
 *      responses:
 *          200:
 *              description: The list of all activities grouped by user.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Report'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/Response'
 */
router.get('/byuser', ReportController.getActivitiesByUser);

/**
 * @swagger
 * /report/byproject:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a list of all activities grouped by project.
 *      tags: [Reports]
 *      responses:
 *          200:
 *              description: The list of all activities grouped by project.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Report'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/Response'
 */
router.get('/byproject', ReportController.getActivitiesByProject);




module.exports = router;