const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact.routes');
const transporter = require('./config/email.config');

// Validate required environment variables
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'TO_EMAIL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please set these in Render Environment settings');
} else {
  console.log('✅ All required environment variables are set');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('TO_EMAIL:', process.env.TO_EMAIL);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');
  
  // Test email connection
  transporter.verify(function (error, success) {
    if (error) {
      console.error('❌ Email connection failed:', error.message);
    } else {
      console.log('✅ Email server is ready to send messages');
    }
  });
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', contactRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
