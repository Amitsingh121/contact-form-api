const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact.routes');
const { projects } = require('./config/projects.config');

// Validate required environment variables
console.log('🚀 Multi-project Contact Form API');
console.log('📋 Checking project configurations...\n');

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
    console.log(`✅ ${project.name} (${projectId}): Configured`);
    console.log(`   From: ${project.emailUser} → To: ${project.toEmail}`);
    hasValidProjects = true;
  }
});

// Check legacy default credentials
const hasDefaultConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.TO_EMAIL;
if (hasDefaultConfig) {
  console.log(`✅ Default config: Configured (for backward compatibility)`);
  console.log(`   From: ${process.env.EMAIL_USER} → To: ${process.env.TO_EMAIL}`);
}

if (!hasValidProjects && !hasDefaultConfig) {
  console.log('\n⚠️  Warning: No valid project configurations found!');
}

console.log('\n' + '='.repeat(60) + '\n');

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
