'use strict';

exports = module.exports = function(app, mongoose) {
  require('./schemas/Place')(app, mongoose);
  require('./schemas/Menu')(app, mongoose);
};
