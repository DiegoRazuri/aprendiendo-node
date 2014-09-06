//libreries
var passport = require("passport");
var	LinkedInStrategy = require("passport-linkedin").Strategy;
//Modelos
var User = require('../models/user');

var linkedinConnection = function(server){
	console.log("linkedinConnection ready");

	passport.use( 
		new LinkedInStrategy(
		{
			consumerKey : "****",
			consumerSecret : "****",
			callbackURL : "http://127.0.0.1:3000/auth/linkedin/callback"		
		}, 
		function (token, tokenSecret, profile, done){
			/*User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
			return done(null, profile);
			});	*/
			var user = new User({
				username : profile.username,
				info : profile
			});

			user.save(function(err){
				if(err){
					done(err, null);
					return;
				}
				done(null, profile);
			});
		}
	));

	server.get("/auth/linkedin", passport.authenticate("linkedin"));
	server.get("/auth/linkedin/callback", passport.authenticate("linkedin", {failureRedirect: '/?error=algo-paso'}),
	function (req, res) {
		res.redirect("/app");
	});
};

module.exports = linkedinConnection;
