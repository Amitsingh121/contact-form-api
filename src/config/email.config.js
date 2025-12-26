const nodemailer = require('nodemailer');

// Factory function to create email transporter dynamically
// This allows different projects to use different Gmail accounts
const createTransporter = (emailUser, emailPass) => {
  if (!emailUser || !emailPass) {
    throw new Error('Email credentials are required to create transporter');
  }

  console.log(`Creating Gmail transporter for: ${emailUser}`);

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

module.exports = { createTransporter };
