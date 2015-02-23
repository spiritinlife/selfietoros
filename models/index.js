'use strict';

exports = module.exports = function(app, mongoose) {
  require('./schemas/Place')(app, mongoose);
};
