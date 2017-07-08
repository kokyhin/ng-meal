const express = require('express');
const router  = express.Router();
const auth    = require('./auth');
const order   = require('./order');

setHeader = function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

router.use('/auth', setHeader, auth);
rotuer.use('/order', setHeader, order);

module.exports = router;
