const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const moment   = require('moment');
const Option   = require('../models/option');
const Order    = require('../models/order');

router.post('/option', (req, res) => {
  let data = {
    date: moment(new Date(req.body.day)).startOf('day').toISOString(),
    first: req.body.first,
    second: req.body.second
  }
  Option.findOneAndUpdate({'date': data.date}, data, {new: true}, (err, option) => {
    if(err) { return res.status(400).send({message: err.message});}
    if(!option) {
      Option.create(data, (err, newOption) => {
        if(err) { return res.status(400).send({message: err.message});}
        return res.status(200).send({message: 'Option was created'});
      });
    } else {
      return res.status(200).send({message: 'Option was updated'});
    }
  })
});

router.get('/option', (req, res) => {
  let date = moment(new Date(req.query.date)).startOf('day').toISOString();
  Option.findOne({'date': date}, (err, option) => {
    if(err) { return res.status(400).send({message: err.message});}
    if(!option) {
      return res.status(200).send({first: [], second: []});
    }
    return res.status(200).send(option);
  });
});

router.post('/order-update', (req, res) => {
  delete req.body.user;
  Order.findOneAndUpdate({'_id': req.body._id}, req.body, (err, order) => {
    if(err) { return res.status(400).send({message: err.message});}
    return res.status(200).send('Updated');
  })
});

module.exports = router;
