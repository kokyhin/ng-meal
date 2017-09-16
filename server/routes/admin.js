const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const moment   = require('moment');
const Option   = require('../models/option');
const Order    = require('../models/order');
const Users    = require('../models/user');
const emails   = require('../helpers/mails');
const transporter = require('../helpers/mainConfig');

router.post('/option', (req, res) => {
  let data = {
    date: moment(new Date(req.body.day)).startOf('day').toISOString(),
    first: req.body.first,
    second: req.body.second
  }
  Option.findOneAndUpdate({'date': data.date}, data, {upsert: true}, (err, option) => {
    if(err) { return res.status(400).send({message: err.message});}
    Order.find({'date': data.date}).populate('user').exec((err, orders) => {
      if(err) { return res.status(400).send({message: err.message});}
      if(!orders.length) return res.status(200).send({message: 'Success'});
      let mails = [];
      let message = '';
      let date = moment(data.date).locale('ru').format('ll');
      orders.forEach(order => {mails.push(order.user.email)});
      if(data.first.length) { message += 'Первое на выбор: ' + data.first.toString() + '\n'; };
      if(data.second.length) { message += 'Второе на выбор: ' + data.second.toString() + '\n'; };
      transporter.sendMail(emails.menuChanged(mails.toString(), message, date), (err, info) => {
        if (err) { return res.status(400).send({message: `Option was created but mail isn't sent`}); }
        return res.status(200).send({message: 'Success'});
      });
    });
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

router.post('/mailing', (req, res) => {
  Users.find({}, (err, users) => {
    if(err) return res.status(400).send({message: error});
    let emailsArr = [];
    users.forEach( user => { emailsArr.push(user.email)});
    let stringOfEmails = emailsArr.toString();
    transporter.sendMail(emails.notification(stringOfEmails, req.body.message), (error, info) => {
      if (error) {
        return res.status(400).send({message: error});
      }
      return res.status(200).send('Send');
    });
  });
});

module.exports = router;
