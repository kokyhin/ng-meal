var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var option = new Schema({
  id: Schema.ObjectId,
  date: Date,
  first: { type: Array },
  second:{ type: Array }
});

module.exports = mongoose.model('options', option);
