var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var swig = require('swig');
var app = express();

// database conf
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

// view engine setup
// NOTE: You should always cache templates in a production environment.
// Flip these switch when going production
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });

// Change this to whatever extension you want
// Using .auth extension to refer to all templates
// related to authentication
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'views'));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash()); // use connect-flash for flash messages stored in session

// ROUTES
var authRouter = require('./routes/auth.js')(express, app, passport); 
app.use('/', authRouter);

// api router endpoint for AngularJS
var apiRouter = require('./routes/api.js')(express);
app.use('/api', apiRouter);

// Sends back AngularJS file
var myAppRouter = require('./routes/myapp.js')(express, path);
app.use('/', myAppRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = process.env.PORT || '5000';
app.listen(port);
console.log('I am listening on port: ' + port);

module.exports = app;
