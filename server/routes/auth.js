const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const User     = require('../models/user')
const passport = require('passport');
const crypto   = require('crypto');
const nodemailer = require('nodemailer');
const transporter = require('../helpers/mainConfig');
const emails      = require('../helpers/mails');
const jwt      = require('jsonwebtoken');
generateRandomToken = (len) => {
  return crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0,len);
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
      token: generateRandomToken(20),
    }), req.body.password, (err, newUser) => {
      if (err) {return res.status(400).send({message: err.message});}
      let resetTokenLink = process.env.APP_URL + 'signin/?activation=' + newUser.token;
      transporter.sendMail(emails.createUser(newUser.email, resetTokenLink), (error, info) => {
        if (error) {return res.status(400).send({message: error.message}); }
        return res.status(200).send({message: `On your email: ${newUser.email} was send instruction`});
      });

    });
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  User.findOne({'_id': req.user._id}, (err, user) => {
    if (err) { return res.status(400).send({message: err.message}); }
    if(!user.active) {
      if (!req.body.token) {
        return res.status(400).send({message: 'Your account is deactivated, please follow link that you received in email'});
      }
      if (req.body.token == user.token) {
        user.token = undefined;
        user.active = true;
        user.save((err, updatedUsed) => {
          if (err) { return res.status(400).send({message: err.message}); }
          return res.send(updatedUsed);
        })
      } else {
        return res.status(400).send({message: 'Wrong token'});
      }
    } else {
      return res.send(user);
    }
  });
});

router.post('/login-mobile', (req, res) => {
  User.findOne({'username': { $regex: new RegExp("^" + req.body.username.toLowerCase(), "i") } }, (err, user) => {
    if (!user) return res.status(400).send({message: `There is no such user ${req.body.username}`});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const userJson = user.toJSON();
        delete userJson.password;
        delete userJson.orders;
        const token = jwt.sign(userJson, process.env.SECRET_KEY);
        return res.json({token});
      } else {
        return res.status(400).send({message: 'Wrong Password'});
      }
    });
  })
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).send({message: 'Logged out'});
});

router.post('/reset-password', (req, res) =>{
  User.findOne({ email: req.body.email}, (err, user) => {
    if (!user) { return res.status(404).send({message: 'User not found'}); }
    if(err) { return res.status(400).send({message: err.message}); }
    user.token = generateRandomToken(20);
    user.tokenExpires = Date.now() + 3600000; // 1 hour
    user.save((err) => {
      if(err) { return res.status(400).send({message: err.message}); }
      let resetTokenLink = process.env.APP_URL + 'reset-password/?reset=' + user.token;

      transporter.sendMail(emails.resetPassword(user.email, resetTokenLink), (error, info) => {
        if (error) {return res.status(400).send({message: error.message}); }
        return res.status(200).send({message: `On your email: ${req.body.email} was send reset password instruction`});
      });
    });
  });
});

router.put('/update-password', (req, res) =>{
  const newPass = req.body.password;
  const token   = req.body.token;
  User.findOne({token: token, tokenExpires: { $gt: Date.now() }}, (err, user) => {
    if(err) { return res.status(200).send({message: err.message})};
    if(!user) {return res.status(404).send({message: 'User not found or token expired, please reset password again'})};

    user.password = newPass;
    user.token = undefined;
    user.tokenExpires = undefined;

    user.save((err) =>{
      if(err) { return res.status(200).send({message: err.message})};
      return res.status(200).send({message: 'Password was successfully updated please login'})
    });
  });
});

router.get('/is-auth', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  } else {
    jwt.verify(req.get('Authorization'), process.env.SECRET_KEY, function(err, user) {
      if (err) {
        return res.status(401).send({message: 'Unauthorized'});
      } else {
        req.user = user;
        return res.status(200).send(req.user);
      }
    });
  }
});

module.exports = router;
