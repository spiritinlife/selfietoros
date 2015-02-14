"use strict";

exports.show = function(req, res, next) {
  var db = req.app.db.mongojs;
  db.collection(req.params.model).findOne({_id: req.params.id}, function(error, result) {
    res.json({
      error: error,
      result: result
    });
  });
};

exports.index = function(req, res, next) {
  var db = req.app.db.mongojs;
  db.collection(req.params.model).find(function(error, results) {
    res.json({
      error: error,
      result: results
    });
  });
};

exports.create = function(req, res, next) {
  var db = req.app.db.mongojs;
  db.collection(req.params.model).save(req.body, function(error, result) {
    res.json({
      error: error,
      result: result
    });
  });
};

exports.update = function(req, res, next) {
  var db = req.app.db.mongojs;
  db.collection(req.params.model).update({_id: req.params.id}, req.body, function(error, result) {
    res.json({
      error: error,
      result: result
    });
  });
};

exports.destroy = function(req, res, next) {
  var db = req.app.db.mongojs;
  db.collection(req.params.model).remove({_id: req.params.id}, function(error, result) {
    res.json({
      error: error,
      result: result
    });
  });
};
