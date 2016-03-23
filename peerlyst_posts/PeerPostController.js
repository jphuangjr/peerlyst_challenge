var PeerPost = require("./PeerPostModel.js");
var Q = require("q");


var createPost = Q.nbind(PeerPost.create, PeerPost);
var findAllPosts = Q.nbind(PeerPost.find, PeerPost);

module.exports = {
	addPost: function(req, res, next){
		req.session = {user: {auth: "peerlyst", user_id: 1, name: "Joshua Huang"}} //TODO: Dummy Data to simulate logged in user
		console.log("Request Body: ",req.body)
		var auth = req.session.user.auth
		var type = req.body.type;
		var user = req.session.user.user_id
		var tags = req.body.tags
		var content = req.body.content

		createPost({
			auth: auth,
			type: type,
			user_id: user,
			tags: tags,
			content: content
		})
		.then(function(newPost){
			res.json(newPost)
		})
		.fail(function(error){
			next(error)
		})
	},

	getPeerlystPostsA: function(req, res){
		findAllPosts({auth:"peerlyst", type:"a"})
				.then(function(posts){
					//console.log(posts)
					res.json(posts)
				})
				.fail(function(error){
					throw error
				})
	},

	getPeerlystPostsB: function(req, res){
		findAllPosts({auth:"peerlyst", type:"b"})
				.then(function(posts){
					//console.log(posts)
					res.json(posts)
				})
				.fail(function(error){
					throw error
				})
	},

	getUserPosts: function(req, res){
		findAllPosts({auth:"user"})
				.then(function(posts){
					console.log(posts)
					res.json(posts)
				})
				.fail(function(error){
					throw error
				})
	},

	getFeed: function(){
		//req.session = {user: {auth: "peerlyst", user_id: 1, name: "Joshua Huang"}} //TODO: Dummy Data to simulate logged in user

		//var PeerLystPostsA = module.exports.getPeerlystPostsA()
		//var PeerLystPostsB = module.exports.getPeerlystPostsB()
		//var UserPosts = module.exports.getUserPosts()
	}
}

