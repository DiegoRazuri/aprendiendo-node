var	passport = require("passport");
var	TwitterStrategy = require("passport-twitter").Strategy;

var User = require('../models/user');
	/*passportTwitter = require("passport-twitter"),
	TwitterStrategy = passportTwitter.TwitterStrategy;*/

var twitterConnection = function(server){
	console.log("twitterConnection ready");
	
	passport.use(
		new TwitterStrategy(
		{
			consumerKey: '****',
			consumerSecret: '****',
			callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
		},
		function (token, tokenSecret, profile, done){
			var user = new User({
				username : profile.username,
				twitter : profile
			});

			user.save(function (err){
				if(err){
					done(err, null);
					return;
				}
				done(null, profile);				
			});
			
		}
	));

	server.get('/auth/twitter', passport.authenticate('twitter'));
	server.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/?error=algo-paso'}),
	function (req, res) {
		res.redirect('/app');
	});
};

module.exports = twitterConnection;
