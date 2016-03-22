var Q = require('q');
var mongoose = require('mongoose');

var tagPostSchema = new mongoose.Schema({

	tag_id: {
		type: Number
	},

	post_id: {
		type: Number
	}

});

module.exports = mongoose.model('TagPost', tagPostSchema);