var mongoose = require('mongoose');
var schema = mongoose.Schema;

var infoSchema = new schema({
	name: {
		type: String,
		required: true
	},
	created_by: {
		type: String,
		required: true
	},
	created_date: {
		type: Date,
		default: Date.Now,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	description: String,
	order: Number,
	scheduleIds: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'schedule'
	}]
});

module.exports = mongoose.model('info', infoSchema);