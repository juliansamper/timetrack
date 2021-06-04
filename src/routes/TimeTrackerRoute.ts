import express from 'express';

const router = express.Router();

const ActivityService = require('../services/ActivityService');
const ProjectService = require('../services/ProjectService');
const ReportService = require('../services/ReportService');
const SecurityService = require('../services/SecurityService');

/**
 * @swagger
 * tags:
 *  name: Activities
 *  description: The activities managing API.
 */
 router.use('/activity', ActivityService);

/**
 * @swagger
 * tags:
 *  name: Projects
 *  description: The project managing API.
 */
router.use('/project', ProjectService);

/**
 * @swagger
 * tags:
 *  name: Reports
 *  description: The report managing API.
 */
router.use('/report', ReportService);

/**
 * @swagger
 * tags:
 *  name: Security
 *  description: The security managing API.
 */
router.use('/security', SecurityService);




module.exports = router;