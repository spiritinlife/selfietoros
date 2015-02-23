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
var redis = require('redis');
var app = express();

//connect to databasemaster
console.log(process.env.MONGOLAB_URL);

app.db = mongojs(process.env.MONGOLAB_URL || "mongodb://localhost/");
//|| "mongodb://selfietoros:s3lfi3t0r0s!@ds062797.mongolab.com:62797/selfietoros",['owners']);
app.redis =  redis.createClient();



app.use(serveStatic("./public"));
app.use("/bower_components", serveStatic("./bower_components"));

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

var generateHmac = function(data, secretKey, algorithm, encoding) {
  var crypto = require("crypto");
  algorithm = algorithm || "sha256";
  encoding = encoding || "base64";
  secretKey = secretKey || "1234567890";
  return crypto.createHmac(algorithm, secretKey).update(data).digest(encoding);
};



var security  = require("./utils/security")(app);

app.post("/api/admin/login",function(req,res){
  if (!!req.body.email || !!req.body.password){
    res.status(400).json({
           error: "login error",
           result: null
         });
  }
  app.db.owners.findOne({
      email : req.body.email,
      password : req.body.password
  }, function(err, owner) {
    if (err || !!owner)
    {
      res.status(400).json({
             error: "login error",
             result: null
           });
    }

    security.createToken(function(err,token){

         if (err) {
           res.status(400).json({
                  error: "login error",
                  result: null
                });
         }
         else
         {
            security.setTokenWithData(token,{id:owner._id},null,function(err,isSet){
              if (err) res.sendStatus(400);
              else if (isSet) {
                res.json({user : { token : token }});
              };
            });
         }
      });
  });
});


app.post("/api/admin/register",function(req,res){
  if (!!req.email || !!req.password){
    res.status(400).json({
           error: "register error",
           result: null
         });
  }

  app.db.owners.insert({
    email : req.email,
    password : req.password}, function(err, owner) {
    if (err)
    {
      res.status(400).json({
             error: "register error",
             result: null
           });
    }
    security.createToken(function(err,token){
         if (err) {
           res.status(400).json({
                  error: "login error",
                  result: null
                });
         }
         else
         {
            security.setTokenWithData(token,{id:owner._id},null,function(err,isSet){
              if (err) res.sendStatus(400);
              else if (isSet) {
                res.json({user : { token : token }});
              };
            });
         }
      });
  });
});

app.post("/api/admin/place/register",function(req,res){

});

app.get('/api/qr',function(req,res){
    var qr = qrCode.qrcode(4, 'M');
    qr.addData("Hello");
    qr.make();
    res.send(qr.createImgTag(4));    // creates an <img> tag as text
});



//setup routes
app.use(require('./routes')(app));

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
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500).json({
          message: err.message,
          error: {}
      });
  });
});


module.exports = app;
