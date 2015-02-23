var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var qrCode = require('qrcode-npm');
var routes = require('./routes/index');
var users = require('./routes/users');
var serveStatic = require("serve-static");
//var redis = require('redis');
var app = express();

//connect to databasemaster
console.log(process.env.MONGOLAB_URL);

app.db = mongojs(process.env.MONGOLAB_URL || "mongodb://selfietoros:s3lfi3t0r0s!@ds062797.mongolab.com:62797/selfietoros",['users']);
//app.redis =  redis.createClient();



app.use(serveStatic("./public"));

// view engine setup
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get(["/index","/"], function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/qr',function(req,res){
    var qr = qrCode.qrcode(4, 'M');
    qr.addData("Hello");
    qr.make();

    res.send(qr.createImgTag(4));    // creates an <img> tag as text
});


app.get("*",function(req,res){
  res.sendFile(path.join(__dirname, 'public/error.html'));
})

//setup routes
//app.use(require('./routes')(app));

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


module.exports = app;
