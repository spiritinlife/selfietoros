module.exports = function(app){
  var express = require('express');
  var router = express.Router();




  router.post("/admin/logout",function(req,res,next){
    //check username password in db
    //security
  });

  router.post("/admin/logout",function(req,res,next){
    //check username password in db
    //security
  });


  /* GET home page. */
  router.get("/admin/", function(req, res, next) {
  //  res.locals.title = "iorder";
  //  res.locals.brand = "iorder";
  /*  res.locals.menu = {
      categories : [
        {name:"Kafes",items:[
          {name:"Cappuchino",price:3},
          {name:"Cappuchino",price:3},
          {name:"Cappuchino",price:3}
          ]
        },
        {name:"Prwino",items:[
          {name:"Omeleta",price:5},
          {name:"Omeleta",price:5},
          {name:"Omeleta",price:5}
          ]
        }
      ]
    };*/
  //  res.locals.menu = {
  //    categories : []
  //  };
    res.render("index.html");
  });



  return router;
};
