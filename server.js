var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require("./config");
var mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.Promise = global.Promise;
mongoose.connect(config.database, function(error) {
	if(error) {
		console.log(error);
	} else {
		console.log('Connected to the database...');
	}
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express, io);

app.use('/api', api);

app.get('*', function(request, response) {
	response.sendFile(__dirname + '/public/app/views/index.html');
});

http.listen(config.port, function(error) {
	if (error) {
		console.log(error);
	} else {
		console.log('Listening on port ' + config.port);
	}
});
