const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');

router.get('/get-week', function(req, res){
 return res.status(200).send({message: 'Here should be a week'})
});

module.exports = router;
