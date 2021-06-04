const _ = require("lodash");
const jwt = require('jsonwebtoken');
const CONFIG = require('../../index.json');
const ErrorHandler = require('../utils/ErrorHandler');

import moment from 'moment';
import { ResponseDTO } from '../DTO/ResponseDTO';

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */
function validateToken(req, res, next) {
    try {

        let token: string = _.get(req.headers, "authorization", "");

        // Validate Token
        if (token) {
            token = token.replace('Bearer ', '');

            // verify token and get uid - User ID
            jwt.verify(token, process.env.SECRETKEY, function (error, user) {
                if (error) {
                    let response: ResponseDTO = new ResponseDTO();

                    response.code = '401';
                    response.message = `The token is invalid!`;
                    response.detail = 'INVALID TOKEN';
                    response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

                    ErrorHandler.sendError(response, req, res, next);
                } else {
                    req.user = user.uid;

                    if (req.originalUrl.startsWith('/api/v1/report')) {
                        if (user.rol.startsWith(process.env.ADMIN)) {
                            next();
                        } else {
                            let response: ResponseDTO = new ResponseDTO();

                            response.code = '403';
                            response.message = `The user has no permission to acces this resource (${req.originalUrl})!`;
                            response.detail = 'FORBIDDEN';
                            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        
                            ErrorHandler.sendError(response, req, res, next);
                        }
                    } else {
                        next();
                    }
                }
            });
        } else {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '401';
            response.message = `The token is required!`;
            response.detail = 'INVALID TOKEN';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            ErrorHandler.sendError(response, req, res, next);
        }

    } catch (error) {
        ErrorHandler.sendError(error, req, res, next);
    }
}

module.exports = {
    validateToken
}