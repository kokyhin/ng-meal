var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt               = require('bcrypt-nodejs');
var pasportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  id:         Schema.ObjectId,
  username:   { type: String, required: true, unique: true},
  email:      { type: String, required: true, unique: true},
  password:   { type: String},
  admin:      {type: Boolean, default: false},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  orders: [{
    type: Schema.ObjectId,
    ref: 'orders'
  }]
});

User.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

User.plugin(pasportLocalMongoose);

module.exports = mongoose.model('users', User);
