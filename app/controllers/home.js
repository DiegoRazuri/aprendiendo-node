var homeController = function(server, users){

	//Middlewares

	var inLoggedIn = function (req, res, next){
		if(req.session.passport.user){
			res.redirect("/app");
			return;
		}
		next();
	};

	//Routes
	server.get("/", inLoggedIn, function (req, res){
		res.render("home");
	});

	server.post("/log-in", function (req, res){
		req.session.user = req.body.username;
		server.io.broadcast("log-in",{username:req.session.user});
		
		users.push(req.body.username);
		
		res.redirect("/app");
	});

};

module.exports = homeController;

