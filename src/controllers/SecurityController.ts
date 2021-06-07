const _ = require('lodash');
const ErrorHandler = require('../utils/ErrorHandler');

import moment from 'moment';
import { ResponseDTO } from '../DTO/ResponseDTO';
import { SecurityDTO } from '../DTO/SecurityDTO';

const SecurityBusiness = require('../business/SecurityBusiness');


function login(req, res, next) {
    try {

        let user: string = _.get(req.body, 'user', '');
        let password: string = _.get(req.body, 'password', '');

        if(!user) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The username field is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }
        if(!password) {
            let response: ResponseDTO = new ResponseDTO();

            response.code = '400';
            response.message = `The password field is required!`;
            response.detail = 'BAD REQUEST';
            response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

            next(response);
            return;
        }

        SecurityBusiness.login(user, password)
            .then(function (data: SecurityDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
                return;
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
        return;
    }
}




module.exports = {
    login
}