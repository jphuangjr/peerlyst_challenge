var Q = require('q');
var mongoose = require('mongoose');

var PeerPostSchema = new mongoose.Schema({
	auth: {
		type: String
	},

	type: {
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
	},

	following: {
		type: Array
	}

});

module.exports = mongoose.model('PeerPost', PeerPostSchema);