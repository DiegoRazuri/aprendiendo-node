var express = require('express.io'),
	swig = require('swig');
	_ = require("underscore"),
	passport = require("passport");

var server = express();
//prendemos los sockets
server.http().io();


var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");


var RedisStore = require("connect-redis")(session);

var users = [];

swig.setDefaults({
	cache : false
});
// Configuracion para renderear vistas
//se le dice al server que tenga un motor de templates para el html
server.engine("html", swig.renderFile);
server.set("view engine", "html");
server.set("views", "./app/views");

//Carga archivos estaticos
server.use(express.static("./public"));

//configuramos post, cookies, y sessions

server.use(logger());
server.use(cookieParser());
server.use(bodyParser());
server.use(session({
	secret : "lolcatz",
	store : new RedisStore({})
}));
server.use(passport.initialize());
server.use(passport.session());

//Serializamos usuarios segun passport lo requiere

passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

//Import Modules Controllers

var homeController = require("./app/controllers/home.js");
var appController = require("./app/controllers/app.js");

homeController(server, users);
appController(server, users);

//Import Connections

var linkedinConnection = require("./app/connections/linkedin");

linkedinConnection(server);

var twitterConnection = require("./app/connections/twitter");

twitterConnection(server);

//Listen port 3000

server.listen(3000);