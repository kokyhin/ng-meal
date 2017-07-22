const express = require('express');
const router  = express.Router();
const auth    = require('./auth');
const order   = require('./order');

setHeader = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send({message: 'Unauthorized'});
  }
};

router.use('/auth', setHeader, auth);
router.use('/order', setHeader, ensureAuthenticated, order);

module.exports = router;
