const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const moment   = require('moment');
const timeZone = require('moment-timezone');
const _        = require('lodash');
const Order    = require('../models/order');
const Option   = require('../models/option');
const User     = require('../models/user');

function generateWeek() {
  let date = moment();
  let week;
  if ((date.weekday() == 5 && date.hour() >= 14) || date.weekday() > 5 || date.weekday() == 0)  {
    let nextWeek = date.isoWeek(date.isoWeek() +1);
   return getCurrentWeek(nextWeek);
  } else {
    week = getCurrentWeek(date);
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
      date: moment.unix(date.isoWeekday(i).startOf('day').unix()),
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
        return order.date / 1000 == day.date.unix();
      });
      if(orderFound) {
        day._id = orderFound._id;
        let oldOrder = {
          first: orderFound.first,
          second: orderFound.second,
          total: orderFound.total
        }
        day.order = oldOrder;
        return day;
      } else {return day;}
    });
    Option.find({}, (err, options) => {
      let newWeek = _.map(weekPopulated, (day, i) => {
        let optionFound = _.find(options, (option) => {
          return option.date / 1000 == day.date.unix();
        });
        if (optionFound) {
          day.options = {
            first: optionFound.first,
            second: optionFound.second
          }
          return day;
        } else {
          let fridayDefault = []
          if(i == 4) {
            fridayDefault = ['Перцы', 'Блини с мясом']
          }
          day.options = {
            first: [],
            second: fridayDefault
          }
          return day;
        }
      });
      return res.status(200).send(newWeek);
    });
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
  let weekOrders = [];
  let weekDays = _.map(week, (day) => {return day.date;});
  Order.find().populate('user').exec((err, orders) => {
    if(err) { return res.status(400).send({message: err.message});}
    weekDays.forEach(function(day) {
      let dayOrders = _.map(_.filter(orders, (order) => {
        return new Date(order.date) / 1 == day;
      }), (order) => {
        return {
          _id: order._id,
          total: order.total,
          user: order.user.username,
          first: order.first,
          second: order.second
        }
      })
      weekOrders.push(dayOrders);
    }, this);
    return res.status(200).send(weekOrders);
  });
});

router.post('/', (req, res) => {
  let order = req.body;
  User.findOne({'_id': req.user._id}, (err, user) => {
    if(!user) {return res.status(400).send({message: 'Usernot found'});}
    if(err) { return res.status(400).send({message: err.message});}
    order.user = user._id;
    order.total = order.order.first.value * process.env.PRICE_FIRST + order.order.second.value * process.env.PRICE_SECOND;
    order.first = order.order.first;
    order.second = order.order.second;
    delete order.order;
    let mdTime = timeZone().tz("Europe/Bucharest").get('hour');
    let orderDate = new Date(order.date) / 1000;
    let currDate = moment().startOf('day').unix();
    if(orderDate < currDate) {
      return res.status(400).send({message: 'Forbidden'});
    }
    if (orderDate == currDate && mdTime > 9) {
      return res.status(400).send({message: 'You can not order meal after 10 AM'});
    }
    if (order._id) {
      Order.findOneAndUpdate({_id: order._id}, order, {new: true}, (err, updatedOrder) => {
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
