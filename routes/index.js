module.exports = function(app){		
  var express = require('express');
  var router = express.Router();
  var security  = require("../utils/security")(app);
  var fs = require("fs");

  /* GET login page. */
  router.get(["/index","/"], function(req, res, next) {
    res.render("landing");
  });


  /*router.post("/admin/login",function(req,res,next){
  	//check username password in db
    var post  = req.body;
    if (post.email === "admin@gmail.com" && post.password === "admin") {
      security.createToken(function(err,token){
           if (err) res.sendStatus(401);
           else
           {
              security.setTokenWithData(token,{email:post.user,password:post.password},null,function(err,isSet){
                if (err) res.sendStatus(401);
                else if (isSet) {
                  res.json({ token:token , redirect : "/admin/index"});
                };
              });
           }
        });
    } 
    else {
      res.sendStatus(401);
    }
  });*/


  //router.use("/admin",security.verify);
  /*router.use("/admin",function(req,res,next){
  	if (!!req._user)
  	{

      next();
  	}
  	else
  	{
      res.render("/admin/index");
  	}
  });*/

  router.post("/admin/logout",function(req,res,next){
    //check username password in db
    //security    
  });

  /* GET home page. */
  router.get(["/admin","/admin/index"], function(req, res, next) {
    res.render("admin/index");
  });


  /* Not found page */
  router.get('*', function(req, res, next) {
    res.send("<h1>404 - Not found page</h1>")
  });

  return router;
};
