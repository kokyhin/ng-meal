var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  id:         Schema.ObjectId,
  username:   { type: String, required: true, unique: true},
  email:      { type: String, required: true, unique: true},
  password:   { type: String},
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
