const express = require('express');
const router  = express.Router();
const auth    = require('./auth');

setHeader = function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

router.use('/auth', setHeader, auth);

module.exports = router;
