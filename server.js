var express = require('express')
var mongoose = require('mongoose')
var session = require('express-session') // Currently not in use but would be used to store logged in user in session
var bodyParser = require("body-parser")
var app = express();

//MiddleWare
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(process.env.DB || 'mongodb://localhost/peerlyst');

app.listen(8082, function(){
	console.log("Running on Port 8082")
})

var peerlyst_posts = require("./peerlyst_posts/PeerPostController");


//AUTH MIDDLEWARE

var authenticate = function(req, res, next){
	req.session = {user: {auth: "peerlyst", user_id: 1, name: "Joshua Huang"}} //TODO: Simulates logged in user
	if(req.session.user){
	//assume req.session.user is a object with details about user and type of user
	//eg. regular authenticated user vs peerlyst user
		console.log("passed auth")
		next()
	} else {
		//Credentials failed. Redirect or display error
		res.redirect("/")
		next()
	}
}


//ROUTES TODO: Need to refactor to own file


app.post("/post", authenticate, peerlyst_posts.addPost)

app.get("/getUserPosts", authenticate, peerlyst_posts.getUserPosts)

app.get("/getPeerlystPostsA", authenticate, peerlyst_posts.getPeerlystPostsA)

app.get("/getPeerlystPostsB", authenticate, peerlyst_posts.getPeerlystPostsB)

app.get("/getFeed", authenticate, peerlyst_posts.getFeed)