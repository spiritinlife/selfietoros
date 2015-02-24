var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var qrCode = require('qrcode-npm');
var serveStatic = require("serve-static");
var app = express();

//connect to databasemaster
console.log("Databse env var : ",process.env.MONGOLAB_URL);




//setup mongoose
app.db = mongoose.createConnection(process.env.MONGOLAB_URL || "mongodb://iorder:redroi@ds062807.mongolab.com:62807/MongoLab-l");
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
  //and... we have a data store
  console.log("Db connection ready");
});

//config data models
require('./models')(app, mongoose);



app.use(serveStatic("./public"));
// view engine setup
app.set('views', __dirname + '/views/admin');
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade');


app.disable('x-powered-by');
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



/*
    DATABASE

  Owner : {
    id : Object.id,
    Place : [Object.id,Object.id,Object.id],
    firstname : String,
    lastname : String,
    email : String as login name
    password : hashed password,
    billingInfo : {}
  }

  Place : {
    id : Object.id,
    name : String,
    Address : String,
    ?AddressLoc : GeoPoint,
    Tables : [Object.id,Object.id,Object.id],
    Menu : Object.id,
    MenuQrCode : String
  }

  Table : {
    id : Object.id,
    name : String or "",
    group : String,
    QrCode : String
  }

  Menu : {
    id : Object.id,
    Category : [Object.id,Object.id]
  }

  Category : {
    id : Object.id,
    name : String,
    items : [Object.id,Object.id,Object.id],
  }

  Item : {
      id : Object.id,
      Category : Object.id
      name : String,
      description : String,
      Img : String,
      options : [Object.id,Object.id,Object.id],
      price : Number
  }
  Option : {
    id : Object.id,
    name : String,
    price : Number
  }
  Order : {

  }
--------------------------------------------------------
  User : {
    id : Object.id,
    ?Fbid : Object.id,
    firstname : string,
    lastName : string,
  }

*/


/*
    LETS THINK THIS API


private post /api/admin/login , user logins and gets access token
private post /api/amdin/register , user registers and goes to login page

private get /api/admin/place , owener gets his places
private get /api/admin/place/{id} , owener gets a place by id
private post /api/admin/place/register , owener registers new place

private get /api/place/{id}/menu , user gets place menu by body : id
private update /api/place/{id}/menu/{id} , user updates place menu by  id
private post /api/place/{id}/menu , user creates place menu by body : id


public get /api/place/{id}/menu/qr gets qr code of menu of place with id
public get /api/place/{id}/menu gets menu of place with id

/api/user



*/


app.get(["/index","/"], function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/qr',function(req,res){
    var qr = qrCode.qrcode(4, 'M');
    qr.addData("Hello");
    qr.make();

    res.send(qr.createImgTag(4));    // creates an <img> tag as text
});


//setup routes
app.use(require('./routes/admin')(app));


app.get("*",function(req,res){
  res.sendFile(path.join(__dirname, 'public/error.html'));
})

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
