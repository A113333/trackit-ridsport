var express = require( 'express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var index = require('./routes/indexRouter');
var users = require('./routes/users');

mongoose.connect("mongodb://localhost/database", function (err, db) {
    if(!err){
      console.log("Connected to DB")
            }
            else{
      console.dir(err)
                }
});

require("./models/addHorseModel");

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// för att kunna använda <script src="/jquery/jquery.js"></script>
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));


app.use('/', index);
app.use('/savePage', index);
app.use('/users', users);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log(err.message);d
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

module.exports = app;