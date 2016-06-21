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
	eventIds: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'events'
	}]
});

module.exports = mongoose.model('schedule', scheduleSchema);
