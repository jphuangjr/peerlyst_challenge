var tag = require("./tagModel.js");
var tag_post = require("./tagPostModel.js");
var Q = require("q");


var createTag = Q.nbind(tag.create, tag);
var findTag = Q.bind(tag.find, tag)
var createRelationship = Q.nbind(tag_post.find, tag_post);

module.exports = {
	addTags: function(Tags){
		req.session = {user: {auth: "peerlyst", user_id: 1, name: "Joshua Huang"}} //TODO: Dummy Data to simulate logged in user
		for(var i=0; i<Tags.length; i++){
			var target = Tags[i]
			findTag({name:target})
					.then(function(result){
						if(!result){
							createTag({name:target})
									.then(function(tag){
										res.json(tag)
									})
						}
					})
		}
	},

	getAllTags: function(req, res){
		findTag({})
		.then(function(tags){
			res.json(tags)
		})
		.fail(function(error){
			throw error
		})
	},

	getUserPosts: function(req, res){
		findAllPosts({auth:"user"})
				.then(function(posts){
					//console.log(posts)
					res.json(posts)
				})
				.fail(function(error){
					throw error
				})
	}


}