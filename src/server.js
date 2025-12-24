const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact.routes');

// Validate required environment variables
if (process.env.SENDGRID_API_KEY) {
  console.log('✅ SendGrid API key is set');
  console.log('FROM_EMAIL:', process.env.EMAIL_USER || 'Not set');
  console.log('TO_EMAIL:', process.env.TO_EMAIL || 'Not set');
} else {
  console.log('⚠️  No SendGrid API key found, using Gmail SMTP');
  const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'TO_EMAIL'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  } else {
    console.log('✅ Gmail SMTP credentials are set');
  }
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
