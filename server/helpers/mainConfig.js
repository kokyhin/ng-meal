var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ACC,
    pass: process.env.MAIL_PASS
  }
});

module.exports = transporter;
