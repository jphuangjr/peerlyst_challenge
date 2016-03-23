var PeerPost = require("./PeerPostModel.js");
var Q = require("q");
var request = require('request');


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

	getFeed: function(req, res){
		var feed = [];
		var PeerLystPostsA, PeerLystPostsB, UserPosts;
		request({
			method: "GET",
			url: "http://localhost:8082/getPeerlystPostsA"
		}, function(err, res2, body){
			PeerLystPostsA = JSON.parse(body);
			res.send(200)
		})
		request({
			method: "GET",
			url: "http://localhost:8082/getPeerlystPostsB"
		}, function(err, res2, body){
			PeerLystPostsB = JSON.parse(body);
			res.send(200)
		})
		request({
			method: "GET",
			url: "http://localhost:8082/getUserPosts"
		}, function(err, res2, body){
			UserPosts = JSON.parse(body);
			res.send(200)
		})

		for(var i=0; i<100; i++){
			if(PeerLystPostsA.length > 0){
				feed.push(PeerLystPostA.shift())
			}
			if(PeerLystPostsB.length > 0){
				feed.push(PeerLystPostB.shift())
			}
		}


		//var PeerLystPostsA = module.exports.getPeerlystPostsA()
		//var PeerLystPostsB = module.exports.getPeerlystPostsB()
		//var UserPosts = module.exports.getUserPosts()
	}
}

