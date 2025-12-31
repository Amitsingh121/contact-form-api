const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const contactRoutes = require('./routes/contact.routes');
const { projects } = require('./config/projects.config');
const { corsOptions, getAllowedOrigins } = require('./config/cors.config');

// Validate required environment variables
// console.log('🚀 Multi-project Contact Form API');
// console.log('📋 Checking project configurations...\n');

// Check each project configuration
let hasValidProjects = false;
Object.keys(projects).forEach(projectId => {
  const project = projects[projectId];
  const missing = [];
  
  if (!project.emailUser) missing.push(`${projectId.toUpperCase()}_EMAIL_USER`);
  if (!project.emailPass) missing.push(`${projectId.toUpperCase()}_EMAIL_PASS`);
  if (!project.toEmail) missing.push(`${projectId.toUpperCase()}_TO_EMAIL`);
  
  if (missing.length > 0) {
    console.log(`❌ ${project.name} (${projectId}): Missing ${missing.join(', ')}`);
  } else {
    // console.log(`✅ ${project.name} (${projectId}): Configured`);
    // console.log(`   From: ${project.emailUser} → To: ${project.toEmail}`);
    hasValidProjects = true;
  }
});

// Check legacy default credentials
const hasDefaultConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.TO_EMAIL;
if (hasDefaultConfig) {
  // console.log(`✅ Default config: Configured (for backward compatibility)`);
  // console.log(`   From: ${process.env.EMAIL_USER} → To: ${process.env.TO_EMAIL}`);
}

if (!hasValidProjects && !hasDefaultConfig) {
  console.log('\n⚠️  Warning: No valid project configurations found!');
}

console.log('\n' + '='.repeat(60) + '\n');

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later' }
});
app.use('/api', limiter);

// CORS configuration
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/api', contactRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'API is running',
    allowedOrigins: process.env.NODE_ENV !== 'production' ? getAllowedOrigins() : undefined
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ success: false, message: 'Origin not allowed' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins: ${getAllowedOrigins().join(', ') || 'None configured'}`);
});
