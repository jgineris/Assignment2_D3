//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var app = express();

//route files to load
var index = require('./routes/index');
var fblogin = require('./routes/fblogin');
var twitlogin = require('./routes/twitlogin');

//Configures the Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

//fbgraph
app.use(express.methodOverride());
app.use(app.router);
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


//routes
app.get('/', index.view); //boilerplate
app.post('/', index.view);

//Facebook
app.get('/auth/facebook', fblogin.fbauthlogin);
app.get('/fblogin', fblogin.fbuser);
app.get('/relationships', fblogin.fbrelationships);

//Twitter
app.get('/auth/twitter', twitlogin.twitauthlogin);

//set environment ports and start application
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});