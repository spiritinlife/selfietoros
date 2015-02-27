'use strict';

exports = module.exports = function(app, mongoose) {

  var menuSchema = new mongoose.Schema({
    created_at    : { type: Date },
    place_id : { type : Number , index : true},
    categories : [{
      name : String,
      items : [{
        name : String,
        price : Number,
        item_options : [{
          name : String,
          price : Number
        }]
      }]
    }]
  });

  menuSchema.pre('save',function(next){
    this.created_at = new Date();
    next();
  });


  app.db.model('Menu', menuSchema);
};
