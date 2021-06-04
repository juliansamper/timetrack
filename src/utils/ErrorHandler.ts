import { ResponseDTO } from '../DTO/ResponseDTO';
import moment from 'moment';

const { LudyConsole } = require('../utils/LudyConsole');

const CONFIG = require('../../index.json');

function sendError(err, req, res, next, earlyError:boolean = false) {
    try {
        let errorResponse: ResponseDTO = err;

        //LudyConsole.error(`(${ errorResponse.source } - ${ errorResponse.code }) ${ errorResponse.message } - ${ errorResponse.detail }.`);
        res.status(errorResponse.code).send(errorResponse);
    } catch (error) {
        next(error);
    }
}

function getError(error: any, code: string = '500') {
    let response: ResponseDTO = new ResponseDTO();

    response.code = code;
    response.message = error.message;
    response.detail = error.stack;
    response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

    return response;
}

module.exports = {
    sendError,
    getError
}