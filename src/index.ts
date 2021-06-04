import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { ResponseDTO } from './DTO/ResponseDTO';
import moment from 'moment';

require('dotenv').config();

const mongodb = require('./connectors/MongoDBConnector');

const ErrorHandler = require('./utils/ErrorHandler');

const { LudyConsole } = require('./utils/LudyConsole');

const AuthenticationMiddleware = require('./middleware/AuthenticationMiddleware');

const TimeTrackerRoute = require('./routes/TimeTrackerRoute');
const HealthcheckRoute = require('./routes/HealthcheckRoute');

const CONFIG = require('../index.json');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "2mb" }));


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Time Track - Library API',
            version: '1.0.0',
            description: 'A simple Library API for Time Track App.',
            contact: {
                name: "Julián Samper",
                email: "juliansamper@gmail.com"
            }
        },
        servers: [
            {
                url: "https://qrvey-js-time-tracker.herokuapp.com/api/v1",
                description: "Test Server"
            }
        ]
    },
    apis:
    [
        './src/services/*.ts',
        './src/routes/*.ts',
        './src/middleware/*.ts',
        './src/DTO/*.ts',
        './src/index.ts'
    ] // files containing annotations as above
};
const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))


let server = app.listen(process.env.PORT, () => {
    if (CONFIG.const.startClean) {
        process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
        console.clear();
    }
    LudyConsole.start(`${CONFIG.apps[0].name} Service Up on port ${process.env.PORT}.`);
});

/**10 minutos de espera para cortar el request */
server.timeout = 540000;

// Middleware
app.use('/api/v1/project', AuthenticationMiddleware.validateToken);
app.use('/api/v1/activity', AuthenticationMiddleware.validateToken);
app.use('/api/v1/report', AuthenticationMiddleware.validateToken);

// Routes
//app.use('/healthcheck', HealthcheckRoute);
app.use('/api/v1', TimeTrackerRoute);

/**
 * @-swagger
 * /:
 *  get:
 *    description: Status service, it helps to know if the service is up and running.
 *    responses:
 *      '200':
 *        description: Returns the name of the app and te date and time of the request.
 */
app.get('/', (req, res) => {
    res.status(200).send(`${CONFIG.apps[0].name} - Service Up
        ${new Date().toLocaleString()}`);
});



// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let response: ResponseDTO = new ResponseDTO();

    response.code = '404';
    response.message = `The resource (${req.originalUrl}) do not exist!`;
    response.detail = 'NOT FOUND';
    response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    
    next(response);
});

// Error handler
app.use((err, req, res, next) => {
    ErrorHandler.sendError(err, req, res, next);
});





/**
 * @author Julian Samper
 * @description Función para manejar el correcto cierre/apagado del servicio.
 * @param signal
 */
let handleExit = (signal) => {
    server.close(function () {
        //clearInterval(localOperationService.intervalTimer);
        LudyConsole.end(`Service Down (${signal}).`);
    });
};

process.on('SIGINT', handleExit);   // Cierre por (Ctrl + C).
process.on('SIGQUIT', handleExit);  // Cierre por teclado.
process.on('SIGTERM', handleExit);  // Cierre desde el Sistema Operativo (e.g. Comando kill).