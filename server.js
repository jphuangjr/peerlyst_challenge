var express = require('express')
var mongoose = require('mongoose')
var session = require('express-session')
var bodyParser = require("body-parser")
var app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(process.env.DB || 'mongodb://localhost/peerlyst');

app.listen(8082, function(){
	console.log("Running on Port 8082")
})

var peerlyst_posts = require("./peerlyst_posts/PeerPostController");


var authenticate = function(req, res, next){
	req.session = {user: {auth: "peerlyst", user_id: 1, name: "Joshua Huang"}} //TODO: Take this out
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


app.post("/post", authenticate, peerlyst_posts.addPost)

app.get("/getUserPosts", authenticate, peerlyst_posts.getUserPosts)

app.get("/getPeerlystPosts", authenticate, peerlyst_posts.getPeerlystPosts)


