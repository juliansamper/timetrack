import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    name: String,
    project_id: String,
    duration: String,
    uid: String
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;