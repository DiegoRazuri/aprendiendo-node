var Post = require("../models/post");
var User = require('../models/user');
var _= require("underscore");

var appController = function (server, users){

	//Middlewares

	var isntLoggedIn = function(req, res, next){
		if(!req.session.passport.user){
			res.redirect("/");
			return;
		}
		next();
	};

	var getUser = function (req, res, next){
		User.findOne({username : req.session.passport.user.username}, 
		function (err, user){		
			req.user = user;
			next();
		});
	};

	//Routes

	server.get("/app", isntLoggedIn, function (req, res){
		Post.find({})
		.populate('user')
		.exec(function (err, posts){
			var postAsJson = _.map(posts, function (post){
				return post.toJSON();
			});

			res.render("app", {
				user: req.session.passport.user,
				users : users,
				posts : postAsJson
			
			});

		});
	});


	server.get("/log-out", function (req, res){
		users = _.without(users, req.session.user);
		server.io.broadcast("log-out", {username:req.session.user});

		req.session.destroy();
		res.redirect("/");
	});

	server.post('/app/create-post', isntLoggedIn, getUser, function (req, res){
		var post = new Post({
			content : req.body.content,
			user : req.user
		});
		post.save(function(err){
			if(err){
				res.send(500, err);
			}
			server.io.broadcast('post', {
				content : post.content,
				user : req.user.toJSON()
			});
			res.redirect('/app');
		});
	});


};

module.exports = appController;