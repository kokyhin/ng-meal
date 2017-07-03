var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');

router.route('/register').post(function(req,res,next) {
  return res.status(400).send({message: 'Invalid email, use corporate Email'});
});

module.exports = router;
