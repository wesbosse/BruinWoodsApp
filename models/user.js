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
    	type: String, 
    	required: true 
    },
    role: {
        type: String,
        required: true
    },//*,
    events: {
        type: Array
    }
    //add collection of events
    /*events: Array*/
});

module.exports = mongoose.model('user', userSchema);