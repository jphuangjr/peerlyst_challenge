var Q = require('q');
var mongoose = require('mongoose');

var PeerPostSchema = new mongoose.Schema({
	auth: {
		type: String
	},

	group: {
		type: String
	},

	user_id: {
		type: Number
	},

	tags: {
		type: Array
	},

	content: {
		type: String
	}

});

module.exports = mongoose.model('PeerPost', PeerPostSchema);