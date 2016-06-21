var mongoose = require('mongoose');
var schema = mongoose.Schema;
/*var Event = mongoose.model('event');*/

var scheduleSchema = new schema({
	name: {
		type: String,
		required: true
	},
	created_by: {
		type: String,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	events: {
		type: Array
	}
	//add collection of events
	/*events: Array*/
});

module.exports = mongoose.model('schedule', scheduleSchema);
