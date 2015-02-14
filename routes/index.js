var express = require('express');
var router = express.Router();


/* GET login page. */
router.get('/admin/login', function(req, res, next) {
  res.render('login');
});

router.use(function(req,res,next){
	if (!req.isAuthenticated)
	{
  		res.render('login');
	}
	else
	{
		next();
	}
});

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('index');
});


module.exports = router;