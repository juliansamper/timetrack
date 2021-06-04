import express from 'express';
const router = express.Router();

const ActivityController = require('../controllers/ActivityController');

/**
 * @swagger
 * /activity:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a list of all activities.
 *      tags: [Activities]
 *      responses:
 *          200:
 *              description: The list of the activities.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Activity'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/Response'
 */
router.get('/', ActivityController.getActivity);

/**
 * @swagger
 * /activity/{activityId}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get the activity by id.
 *      tags: [Activities]
 *      parameters:
 *          - in: path
 *            name: activityId
 *            schema:
 *              type: string
 *            required: true
 *            description: The activity id.
 *      responses:
 *          200:
 *              description: The activity with the given id.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Activity'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
router.get('/:activityId', ActivityController.getActivityById);

/**
 * @swagger
 * /activity/start:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Start/Restart the timer of the activity.
 *      tags: [Activities]
 *      requestBody:
 *          description: Activity object that needs to be started/restarted.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ActivityInput'
 *      responses:
 *          200:
 *              description: The confirmation of the timer start.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Activity'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
router.post('/start', ActivityController.startActivity);

/**
 * @-swagger
 * /activity/restart/{activityId}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Restart the timer of a given activity.
 *      tags: [Activities]
 *      parameters:
 *          - in: path
 *            name: activityId
 *            schema:
 *              type: string
 *            required: true
 *            description: The activity id
 *      responses:
 *          200:
 *              description: The confirmation of the timer restart.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
// router.put('/restart/:activityId', ActivityController.restartActivityById);

/**
 * @swagger
 * /activity/stop/{activityId}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Stop the timer of a given activity.
 *      tags: [Activities]
 *      parameters:
 *          - in: path
 *            name: activityId
 *            schema:
 *              type: string
 *            required: true
 *            description: The activity id.
 *      requestBody:
 *          description: Activity object that needs to be started/stopped.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ActivityInput'
 *      responses:
 *          200:
 *              description: The confirmation of the timer stop.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Activity'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
router.put('/stop/:activityId', ActivityController.stopActivityById);

/**
 * @swagger
 * /activity/{activityId}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Deletes an activity.
 *      tags: [Activities]
 *      parameters:
 *          - in: path
 *            name: activityId
 *            schema:
 *              type: string
 *            required: true
 *            description: The activity id that needs to be deleted.
 *      responses:
 *          200:
 *              description: The Activity was deleted successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
router.delete('/:activityId', ActivityController.deleteActivityById);




module.exports = router;