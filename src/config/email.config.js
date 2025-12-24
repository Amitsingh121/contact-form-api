const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Check if SendGrid API key is available
if (process.env.SENDGRID_API_KEY) {
  // Use SendGrid (recommended for production/Render)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('Using SendGrid for email delivery');
  
  module.exports = {
    sendMail: async (mailOptions) => {
      const msg = {
        to: mailOptions.to,
        from: mailOptions.from,
        subject: mailOptions.subject,
        html: mailOptions.html,
      };
      return await sgMail.send(msg);
    }
  };
} else {
  // Fallback to Gmail SMTP (for local development)
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
}
