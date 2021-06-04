import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: String,
    password: String,
    rol: String,
    name: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;