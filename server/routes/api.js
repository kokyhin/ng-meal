const express = require('express');
const router  = express.Router();
const auth    = require('./auth');
const order   = require('./order');
const admin   = require('./admin');
const jwt      = require('jsonwebtoken');

setHeader = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", 'Origin, Content-Type, Authorization, X-Auth-Token');
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  if (req.method === 'OPTIONS') {
    var headers = {};
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    res.writeHead(200, headers);
    res.end();
  } else {
    next();
  }};

ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    jwt.verify(req.get('Authorization'), process.env.SECRET_KEY, function(err, user) {
      if (err) {
        return res.status(401).send({message: 'Unauthorized'});
      } else {
        req.user = user;
        next();
      }
    });
  }
};

isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next()
  } else {
    res.status(403).send({message: 'Only admin can access'});
  }
};

router.use('/auth', setHeader, auth);
router.use('/order', setHeader, ensureAuthenticated, order);
router.use('/admin', setHeader, ensureAuthenticated, isAdmin, admin);

module.exports = router;
