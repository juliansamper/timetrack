import express from 'express';
const router = express.Router();

const ProjectController = require('../controllers/ProjectController');

/**
 * @swagger
 * /project:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a list of all projects.
 *      tags: [Projects]
 *      responses:
 *          200:
 *              description: The list of the projects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Project'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
router.get('/', ProjectController.getProject);

/**
 * @swagger
 * /project/{projectId}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get the project requested.
 *      tags: [Projects]
 *      parameters:
 *          - in: path
 *            name: projectId
 *            schema:
 *              type: string
 *            required: true
 *            description: The id of the project requested.
 *      responses:
 *          200:
 *              description: The Project requested.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Project'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
router.get('/:projectId', ProjectController.getProjectById);

/**
 * @swagger
 * /project/:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Add a project.
 *      tags: [Projects]
 *      requestBody:
 *          description: Project object that needs to be added/started.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProjectInput'
 *      responses:
 *          201:
 *              description: The Project requested.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Project'
 *          4xx:
 *              description: The error response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
 router.post('/', ProjectController.addProject);

/**
 * @swagger
 * /project/{projectId}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Updates a project.
 *      tags: [Projects]
 *      parameters:
 *          - in: path
 *            name: projectId
 *            schema:
 *              type: string
 *            required: true
 *            description: The project id that needs to be updated.
 *      requestBody:
 *          description: Project object that needs to be added/started.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProjectInput'
 *      responses:
 *          200:
 *              description: The Project was updated successfully.
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
 router.put('/:projectId', ProjectController.updateProjectById);

/**
 * @swagger
 * /project/{projectId}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Deletes a project.
 *      tags: [Projects]
 *      parameters:
 *          - in: path
 *            name: projectId
 *            schema:
 *              type: string
 *            required: true
 *            description: The project id that needs to be deleted.
 *      responses:
 *          200:
 *              description: The Project was deleted successfully.
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
router.delete('/:projectId', ProjectController.deleteProjectById);

module.exports = router;