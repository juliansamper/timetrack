import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: String,
    project_id: { type: mongoose.Types.ObjectId },
    start: Date,
    stop: Date,
    duration: String,
    at: Date,
    uid: { type: mongoose.Types.ObjectId }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;