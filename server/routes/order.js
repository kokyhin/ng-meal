const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const moment   = require('moment');
var _          = require('lodash');
const Order    = require('../models/order');
const User     = require('../models/user');

function generateWeek() {
  let date = moment();
  let currDay = moment().format("DD/MM/YYYY");
  let week;
  if ((date.weekday() == 5 && date.hour() >= 14) || date.weekday() > 5 || date.weekday() == 0)  {
    let nextWeek = date.isoWeek(date.isoWeek() +1);
   return getCurrentWeek(nextWeek);
  } else {
    week = getCurrentWeek(date);
    week.active = currDay;
    return week
  }
}

function getCurrentWeek(date) {
  let week = [];
  let orderDefault = {
    first:  {value: 0, option: 'default'},
    second: {value: 0, option: 'default'},
    total: 0
  }
  for (var i = 1; i < 6; i++) {
    let day = {
      _id: null,
      unix: date.isoWeekday(i).startOf('day').unix(),
      date: moment.unix(date.isoWeekday(i).startOf('day').unix()).format("DD/MM/YYYY"),
      order: orderDefault
    }
    week.push(day);
  }
  return week;
}

function populateWeek(res, req, week) {
  User.findOne({'_id': req.user._id}).populate('orders').exec((err, user) => {
    if(!user) {return res.status(400).send({message: 'Usernot found'});}
    if(err) { return res.status(400).send({message: err.message});}

    let weekPopulated = week.map((day, i) => {
      let orderFound = _.find(user.orders, (order) => {
        return order.date == day.date;
      });
      if(orderFound) {
        day._id = orderFound._id;
        let oldOrder = {
          first: orderFound.first,
          second: orderFound.second
        }
        day.order = oldOrder;
        return day;
      } else {return day;}
    });
    return res.status(200).send(weekPopulated);
  });
}

router.get('/get-week', (req, res) => {
  let week = generateWeek();
  populateWeek(res, req, week);
});

router.get('/get-next-week', (req, res) => {
  let date = moment();
  let nextWeek = date.isoWeek(date.isoWeek() +1);
  let week = getCurrentWeek(nextWeek);
  populateWeek(res, req, week);
});

router.get('/week-orders', (req, res) => {
  let week = generateWeek();
  debugger
});

router.post('/', (req, res) => {
  let order = req.body;
  User.findOne({'_id': req.user._id}, (err, user) => {
    if(!user) {return res.status(400).send({message: 'Usernot found'});}
    if(err) { return res.status(400).send({message: err.message});}
    order.user = user._id;
    order.total = 0;
    order.first = order.order.first;
    order.second = order.order.second;
    delete order.order;
    if (order._id) {
      Order.findOneAndUpdate({_id: order._id}, order, (err, updatedOrder) => {
        if(err) { return res.status(400).send({message: err.message});}
        return res.status(200).send(updatedOrder);
      });
    } else {
      delete order._id;
      Order.create(order, (err, newOrder) => {
        if(err) { return res.status(400).send({message: err.message});}
        user.orders.push(newOrder);
        user.save();
        return res.status(200).send(newOrder);
      });
    }
  });
});

module.exports = router;
