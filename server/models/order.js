var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var order = new Schema({
  id: Schema.ObjectId,
  date: Number,
  full: {type: Number, default: 0},
  first: {
    value: {type: Number, default: 0},
    option: {type: String, default: 'default'}
  },
  second: {
    value: {type: Number, default: 0},
    option: {type: String, default: 'default'}
  },
  total:  Number,
  user: {
    type: Schema.ObjectId,
    ref: 'users'
  }
});

module.exports = mongoose.model('orders', order);
