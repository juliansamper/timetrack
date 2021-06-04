import moment from "moment";
import { ResponseDTO } from "../DTO/ResponseDTO";

const _ = require("lodash");
const jwt = require('jsonwebtoken');
const { LudyConsole } = require("../utils/LudyConsole");
const ErrorHandler = require('../utils/ErrorHandler');

const User = require('../models/UserModel');

function template(user: string, data: any) {
    return new Promise((resolve: any, reject: any) => {
        try {

            resolve(data);

        } catch (error) {
            reject(ErrorHandler.getError(error));
        }
    });
}

function login(_user: string, _password: string) {
    return new Promise((resolve: any, reject: any) => {
        try {

            User.findOne({ user: _user, password: _password })
                .then(function (data: any) {
                    if (data) {
                        console.log();
                        
                        var tokenData: any = {
                            name: data._doc.name,
                            uid: data._doc._id,
                            rol: data._doc.rol
                        };
                        
                        data._doc.token = jwt.sign(tokenData, process.env.SECRETKEY, {
                            expiresIn: '1h'
                        });

                        resolve(data);
                    } else {
                        let response: ResponseDTO = new ResponseDTO();

                        response.code = '401';
                        response.message = `Incorrect username or password!`;
                        response.detail = 'INVALID CREDENTIALS';
                        response.datetime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

                        reject(response);
                    }
                })
                .catch(function (error) {
                    reject(ErrorHandler.getError(error));
                });

        } catch (error) {
            reject(ErrorHandler.getError(error));
        }
    });
}




module.exports = {
    template,
    login
};
