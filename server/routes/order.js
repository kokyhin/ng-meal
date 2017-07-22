const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const moment   = require('moment');

function getCurrentWeek(date) {
  let week = [];
  for (var i = 1; i < 6; i++) {
    let day = {
      unix: date.isoWeekday(i).startOf('day').unix(),
      date: moment.unix(date.isoWeekday(i).startOf('day').unix()).format("DD/MM/YYYY"),
      order: {
        first:  {value: 0, option: 'default'},
        second: {value: 0, option: 'default'},
        total: 0
      }
    }
    week.push(day);
  }
  // week.forEach(function(day) {
  //   mongoose.model
  // }, this);
  return week;
}

router.get('/get-week', function(req, res){
  let date = moment();
  let currDay = date.date() + '/' + (date.month() +1);
  let week;
  if ((date.weekday() == 5 && date.hour() >= 14) || date.weekday() > 5)  {
    let nextWeek = date.isoWeek(date.isoWeek() +1);
    week = getCurrentWeek(nextWeek);
  } else {
    week = getCurrentWeek(date);
    week.active = currDay;
  }
  return res.status(200).send(week);
});

router.get('/get-next-week', function(req, res){
  let date = moment();
  let nextWeek = date.isoWeek(date.isoWeek() +1);
  let week = getCurrentWeek(nextWeek);
  return res.status(200).send(week);
});

module.exports = router;
