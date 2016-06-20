var mongoose = require('mongoose');
var schema = mongoose.Schema;
/*var Schedule = mongoose.model('schedule');*/

var eventSchema = new schema({
    description : {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    created_By: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    //point to schedule
   schedules: {
        type: Array
   },
});

//declares model event
module.exports = mongoose.model('event', eventSchema);