
var crypto = require('crypto');

exports = module.exports = function(app) {

	that =  {
	  TOKEN_LENGTH : 32,
		TIME_TO_LIVE : 60*60*24, //24 hours
		
		createToken : function(callback) {
		    crypto.randomBytes(that.TOKEN_LENGTH, function(ex, token) {
		        if (ex) callback(ex);
		 
		        if (token) callback(null, token.toString('hex'));
		        else callback(new Error('Problem when generating token'));
		    });
		},

		 extractTokenFromHeader : function(headers) {
			if (headers == null) throw new Error('Header is null');
			if (headers.authorization == null) throw new Error('Authorization header is null');

			var authorization = headers.authorization;


			// retrieve token
			var token = authorization; 
			if (token.length != that.TOKEN_LENGTH * 2) throw new Error('Token length is not the expected one');

			return token;
		},


		verify : function(req, res, next) {
			console.log("Verify");
		    var headers = req.headers;
		    if (headers == null) return res.render("login");

		    // Get token
		    try {
		        var token = that.extractTokenFromHeader(headers);
		    } catch (err) {
		        console.log(err);
		        return res.render("login");
		    }
		 
		    //Verify it in redis, set data in req._user
		    that.getDataByToken(token, function(err, data) {
		        if (err) return res.render("login");
		 
		        req._user = data;
		 
		        next();
		    });
		},

		setTokenWithData : function(token, data, ttl, callback) {
		    if (token == null) throw new Error('Token is null');
		    if (data != null && typeof data !== 'object') throw new Error('data is not an Object');
		 
		    var userData = data || {};
		    userData._ts = new Date();
		 
		    var timeToLive = ttl || that.TIME_TO_LIVE;
		    if (timeToLive != null && typeof timeToLive !== 'number') throw new Error('TimeToLive is not a Number');
		 
		    app.redis.set(token, JSON.stringify(userData), function(err, reply) {
		        if (err) callback(err);
		 
		        if (reply) {
		             app.redis.expire(token, timeToLive, function(err, reply) {
		                if (err) callback(err);
		 
		                if (reply) {
		                    callback(null, true);
		                }
		                else {
		                    callback(new Error('Expiration not set on redis'));
		                }
		            });
		        }
		        else {
		            callback(new Error('Token not set in redis'));
		        }
		    });
		 
		},

		getDataByToken : function(token, callback) {
		    if (token == null) callback(new Error('Token is null'));
		 
		     app.redis.get(token, function(err, userData) {
		        if (err) callback(err);
		 
		        if (userData != null) callback(null, JSON.parse(userData));
		        else callback(new Error('Token Not Found'));
		    });
		}
	};

	return that;
};