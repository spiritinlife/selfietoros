module.exports = function(app){
  var express = require('express');
  var router = express.Router();



  router.post("/admin/place/menu",function(req,res){
    if (req.body){

        app.db.models.Menu.create({ place_id : req.body.place_id , categories : req.body.categories },function(err,menu){
          console.log(req.body);
            if (err){
              res.status(400).json({
                error:"No menu defined",
                data : []
              });
            }
            else{
              res.status(200).json({
                error:"menu created",
                data : [menu]
              });
            }
          });
    }
    else{
      res.status(400).json({
        error:"No menu defined",
        data:[]
      });
    }
  });

  router.get("/admin/place/:id/menu",function(req,res){
    app.db.models.Menu.findOne({place_id : req.params.id},{}, { sort: { 'created_at' : -1 } }, function(err,menu){
      if (err){
        res.status(400).json({
          error: "No menu found",
          data : []
        });
      }
      else{
        res.status(200).json(menu);
      }
    });
  });


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
