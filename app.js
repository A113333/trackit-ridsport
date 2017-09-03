var compass = require('compass');
var csurf = require('csurf')
var express = require( 'express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash    = require('connect-flash');
const session = require('express-session')
const RedisStore = require('connect-redis')(session);
//loading process env
process.env.NODE_ENV = "production";



var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var router = express.Router();

const debug = require('debug')('PT');
const name = 'pt';
debug('booting %s', name);


var index = require('./routes/indexRoutes');
var app = express();



mongoose.connect('mongodb://127.0.0.1/pt', function(err,db){
    if (!err){
        console.log('Mongo Connected to db PT!');
    } else{
        console.dir(err); //failed to connect
    }
});

app.use(compass({ cwd: __dirname + 'public' }));

require('./config/passport')(passport);

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || "development");


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//var csrfProtection = csrf({ cookie: true });
app.use(cookieParser());





app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// var cacheTime = "86400000*7";

app.use(compass({ cwd: __dirname + 'public' }));
app.use(express.static(path.join(__dirname, 'public')));




// för att kunna använda <script src="/jquery/jquery.js"></script>
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/moment', express.static(__dirname + '/node_modules/moment/min/moment.min.js'));
app.use('/hbs', express.static(__dirname + '/node_modules/handlebars/dist/'));





app.use('/', index);


var Account = require('./models/accountModel.js');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log(err.message);
    next(err);
});







// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.log(err.message);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(3000, function () {
    console.log('Ready');
});
// console.log(process.env);
console.log("NODE_ENV : ", process.env.NODE_ENV);

module.exports = app;