//  Dependencies
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//  Create a mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/andela');
// Load custom dependencies
var routes = require('./routes/all');

// View engine setup
app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs');

//  Configure Body Parser and Cookie Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

//  Use the public folder for static files
app.use(express.static(path.join(_dirname, 'public')));

console.log(routes.getTodo)
// Create the routes
app.get('/', routes.index);
app.get('/todo', routes.getTodo);
app.post('/todo', routes.postTodo);

// Set port to env.Port or default to 8080
app.set('port', process.env.PORT || 8080);
// Listen to port for connections
app.listen(app.get('port'),function() {
    console.log('App listening at port ' + app.get('port'));
});
