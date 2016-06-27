var express = require('express');
/*var cors = require('cors');*/
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var Forecast = require('forecast');

// Initialize mongoose schemas
require('./models/event');
require('./models/schedule');
require('./models/user');
require('./models/info');
require('./models/weather');

var auth = require('./routes/auth')(passport);
var eventsApi = require('./routes/eventsApi');
var usersApi = require('./routes/usersApi');
var schedulesApi = require('./routes/schedulesApi');
var infosApi = require('./routes/infoApi');
var weatherApi = require('./routes/weatherApi');

var mongoose = require('mongoose'); // add for Mongo support
mongoose.connect("mongodb://localhost:27017/bruinwoods"); // connect to Mongo
var app = express();


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept'); // add remove headers according to your needs
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(session({
    secret: 'keyboard cat'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);

var apiRouter = express.Router();

apiRouter.use('/events', eventsApi);
apiRouter.use('/users', usersApi);
apiRouter.use('/schedules', schedulesApi);
apiRouter.use('/infos', infosApi);
apiRouter.use('/weather', weatherApi);

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});


module.exports = app;
