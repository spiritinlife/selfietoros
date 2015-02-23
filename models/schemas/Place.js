'use strict';

exports = module.exports = function(app, mongoose) {
  var placeSchema = new mongoose.Schema({
    password: String,
    email: { type: String, unique: true },
  });

  placeSchema.statics.encryptPassword = function(password, done) {
    var bcrypt = require('bcrypt');
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return done(err);
      }

      bcrypt.hash(password, salt, function(err, hash) {
        done(err, hash);
      });
    });
  };

  placeSchema.statics.validatePassword = function(password, hash, done) {
    var bcrypt = require('bcrypt');
    bcrypt.compare(password, hash, function(err, res) {
      done(err, res);
    });
  };

  placeSchema.index({ username: 1 }, { unique: true });
  placeSchema.index({ email: 1 }, { unique: true });

  placeSchema.set('autoIndex', (app.get('env') === 'development')); //only for development ensureindex

  app.db.model('Place', placeSchema);
};
