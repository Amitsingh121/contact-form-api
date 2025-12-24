const nodemailer = require('nodemailer');
require('dotenv').config();

// Gmail SMTP Configuration only (lightweight for Koyeb)
console.log('Using Gmail SMTP for email delivery');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;
