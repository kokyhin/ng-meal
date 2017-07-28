const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const User     = require('../models/user')
const passport = require('passport');
const crypto   = require('crypto');
const nodemailer = require('nodemailer');

generateRandomToken = (len) => {
  return crypto.randomBytes(Math.ceil(len/2)).toString('hex') .slice(0,len);
};

router.route('/register').post((req,res,next) => {
  const mail = req.body.email;
  let isCorporateEmail = (mail) => {
    let mailParts = mail.split('@');
    return mailParts[1] == 'fusionworks.md';
  }

  if(!isCorporateEmail(mail)) {
    return res.status(400).send({message: 'Invalid email, use corporate Email'});
  }

  User.findOne({email: mail}, (err, user) => {
    if (user) {return res.status(400).send({message: 'User already registered'});}

    User.register(new User({
      username: mail.split('@')[0],
      email: mail,
      password: req.body.password,
    }), req.body.password, (err, newUser) => {
      if (err) {return res.status(400).send({message: err.message});}
      return res.status(200).send({message: 'User was successfully registered'});
    });
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  User.findOne({'_id': req.user._id}, (err, user) => {
    if (err) {
      return res.status(400).send({message: err.message});
    }
    res.send(user);
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).send({message: 'Logged out'});
});

router.post('/reset-password', (req, res) =>{
  User.findOne({ email: req.body.email}, (err, user) => {
    if (!user) { return res.status(404).send({message: 'User not found'}); }
    if(err) { return res.status(400).send({message: err.message}); }
    user.resetPasswordToken = generateRandomToken(20);
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    user.save((err) => {
      if(err) { return res.status(400).send({message: err.message}); }
      let resetTokenLink = process.env.APP_URL + 'reset-password/?reset=' + user.resetPasswordToken;

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_ACC,
          pass: process.env.MAIL_PASS
        }
      });

      let mailOptions = {
        from: '"FusionWorks Meal 🍔" <meal@fusionworks.md>',
        to: user.email,
        subject: 'Meal password reset',
        text: `Please folow this URL + ${resetTokenLink} to reset your password`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {return res.status(400).send({message: error}); }
        return res.status(200).send({message: `On your email: ${req.body.email} was send reset password instruction`});
      });
    });
  });
});

router.put('/update-password', (req, res) =>{
  const newPass = req.body.password;
  const token   = req.body.token;
  User.findOne({resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }}, (err, user) => {
    if(err) { return res.status(200).send({message: err})};
    if(!user) {return res.status(404).send({message: 'User not found or token expired, please reset password again'})};

    user.password = newPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.save((err) =>{
      if(err) { return res.status(200).send({message: err})};
      return res.status(200).send({message: 'Password was successfully updated please login'})
    });
  });
});

router.get('/is-auth', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send('isAuth');
  } else {
    return res.status(401).send('Unauthorized');
  }
});

module.exports = router;
