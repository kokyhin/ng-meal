const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const User     = require('../models/user')
const passport = require('passport');

router.route('/register').post(function(req,res,next) {
  const mail = req.body.email;
  let isCorporateEmail = function(mail) {
    let mailParts = mail.split('@');
    return mailParts[1] == 'fusionworks.md';
  }

  if(!isCorporateEmail(mail)) {
    return res.status(400).send({message: 'Invalid email, use corporate Email'});
  }

  User.findOne({email: mail}, function(err, user) {
    if (user) {return res.status(400).send({message: 'User already registered'});}
    User.register(new User({
      username: mail.split('@')[0],
      email: mail,
      password: req.body.password,
    }), req.body.password, function(err, newUser){
      if (err) {return res.status(400).send({message: err.message});}
      return res.status(200).send({message: 'User was successfully registered'});
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  User.findOne({'_id': req.user._id}, function(err, user) {
    if (err) {
      return res.status(400).send({message: err.message});
    }
    res.send(user);
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).send({message: 'Logged out'});
});

router.get('/is-auth', function(req, res){
  if (req.isAuthenticated()) {
    return res.status(200).send('isAuth');
  } else {
    return res.status(401).send('Unauthorized');
  }
});

module.exports = router;
