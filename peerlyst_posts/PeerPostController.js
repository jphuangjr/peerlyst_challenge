var PeerPost = require("./PeerPostModel.js");
var TagPost = require(".././tags/tagPostModel.js");
var Q = require("q");
var request = require('request');


var createPost = Q.nbind(PeerPost.create, PeerPost);
var findAllPosts = Q.nbind(PeerPost.find, PeerPost);
var createRelationships = Q.nBind(TagPost.create, TagPost);

module.exports = {
	addPost: function(req, res, next){
		req.session = {user: {auth: "peerlyst", user_id: 1, name: "Joshua Huang"}} //TODO: Dummy Data to simulate logged in user
		console.log("Request Body: ",req.body)
		var auth = req.session.user.auth
		var type = req.body.type;
		var user = req.session.user.user_id;
		var tags = req.body.tags;
		var content = req.body.content;

		createPost({
			auth: auth,
			type: type,
			user_id: user,
			tags: tags,
			content: content
		})
		.then(function(newPost){
			//loop through tags array and call CreateRelationship to update TagPost table with relationships between post and tags
			res.json(newPost)
		})
		.fail(function(error){
			next(error)
		})
	},

	addToFollows: function(id){
		//checks users following array in db if post ID or Tag ID already exists
		//adds if it does not exist
	},

	getPeerlystPostsA: function(req, res){
		findAllPosts({auth:"peerlyst", type:"a"})
				.then(function(posts){
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
	//Gets posts User is following
	getUserPosts: function(req, res){
		findAllPosts({auth:"user"})
				.then(function(posts){
					var articles = [];
					//loop through posts and check against following. Push following to articles
					res.json(articles)
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
			request({
				method: "GET",
				url: "http://localhost:8082/getPeerlystPostsB"
			}, function(err, res3, body){
				PeerLystPostsB = JSON.parse(body);
				request({
					method: "GET",
					url: "http://localhost:8082/getUserPosts"
				}, function(err, res2, body){
					UserPosts = JSON.parse(body);
					for(var i=0; i<100; i++){
						if(UserPosts.length > 0){
							feed.push(UserPosts.shift())
						}
						if(UserPosts.length > 0){
							feed.push(UserPosts.shift())
						}
						if(PeerLystPostsA.length > 0){
							feed.push(PeerLystPostA.shift())
						}
						if(PeerLystPostsB.length > 0){
							feed.push(PeerLystPostB.shift())
						}
					}
					//SET USER SESSION WITH NEW FEED
					res.send(200)
				})
				res3.send(200)
			})
			res2.send(200)
		})

	}
}

