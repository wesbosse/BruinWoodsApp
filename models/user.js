var mongoose = require('mongoose');
var schema = mongoose.Schema;
/*var Event = mongoose.model('event');*/

var userSchema = new schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    week: String,
    room: String,
    username: { 
    	type: String, 
    	unique: true, 
    	required: true 
    },
    password: { 
    	type: String
    },
    role: {
        type: String,
        required: true
    },
    facebook: {
        fbid:{
            type: String,
            trim: true
        },
        token:{
            type: String
        },
        displayName:{
            type: String
        },
        email:{
            type: String
        },
        profileUrl:{
            type: String
        }
    },
    eventIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    }]
    //add collection of events
    /*events: Array*/
});

module.exports = mongoose.model('user', userSchema);