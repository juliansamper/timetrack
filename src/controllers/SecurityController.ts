const _ = require('lodash');
const ErrorHandler = require('../utils/ErrorHandler');

import { SecurityDTO } from '../DTO/SecurityDTO';

const SecurityBusiness = require('../business/SecurityBusiness');


function template(req, res, next) {
    try {

        let user: string = _(req.body, 'user', '');
        let password: string = _(req.body, 'password', '');

        let request: any = {
            code: "200",
            msg: "Proceso ejecutado correctamente.",
            url: req.originalUrl,
            user: ''+user,
            password: ''+password,
            params: ''+req.params,
            body: ''+req.body
        };

        SecurityBusiness.template(req.user, request)
            .then(function (data: SecurityDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}

function login(req, res, next) {
    try {

        let user: string = _.get(req.body, 'user', '');
        let password: string = _.get(req.body, 'password', '');

        SecurityBusiness.login(user, password)
            .then(function (data: SecurityDTO) {
                res.status(200).send(data);
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(ErrorHandler.getError(error));
    }
}




module.exports = {
    template,
    login
}