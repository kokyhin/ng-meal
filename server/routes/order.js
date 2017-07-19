const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const moment   = require('moment');

function getCurrentWeek(week) {
  return {
    mon: week.weekday(1).date() + '/' + (week.weekday(1).month() +1),
    tue: week.weekday(2).date() + '/' + (week.weekday(2).month() +1),
    wed: week.weekday(3).date() + '/' + (week.weekday(3).month() +1),
    thu: week.weekday(4).date() + '/' + (week.weekday(4).month() +1),
    fri: week.weekday(5).date() + '/' + (week.weekday(5).month() +1)
  }
}

router.get('/get-week', function(req, res){
  let date = moment();
  let currDay = date.date() + '/' + (date.month() +1);
  let weekObj = {};
  if (date.weekday() >= 5 && date.hour() >= 14) {
    let nextWeek = date.isoWeek(date.isoWeek() +1);
    weekObj = getCurrentWeek(nextWeek);
  } else {
    weekObj = getCurrentWeek(date);
    weekObj.acive = currDay;
  }
  return res.status(200).send(weekObj);
});

module.exports = router;
