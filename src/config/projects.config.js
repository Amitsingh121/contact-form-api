require('dotenv').config();

// Projects configuration mapping
const projects = {
  website1: {
    emailUser: process.env.WEBSITE1_EMAIL_USER,
    emailPass: process.env.WEBSITE1_EMAIL_PASS,
    toEmail: process.env.WEBSITE1_TO_EMAIL,
    name: 'Website 1'
  },
  website2: {
    emailUser: process.env.WEBSITE2_EMAIL_USER,
    emailPass: process.env.WEBSITE2_EMAIL_PASS,
    toEmail: process.env.WEBSITE2_TO_EMAIL,
    name: 'Website 2'
  }
};

// Validate project configuration
const validateProjectConfig = (projectId) => {
  const project = projects[projectId];
  
  if (!project) {
    return {
      valid: false,
      message: `Invalid project ID: ${projectId}. Available projects: ${Object.keys(projects).join(', ')}`
    };
  }
  
  const missing = [];
  if (!project.emailUser) missing.push(`${projectId.toUpperCase()}_EMAIL_USER`);
  if (!project.emailPass) missing.push(`${projectId.toUpperCase()}_EMAIL_PASS`);
  if (!project.toEmail) missing.push(`${projectId.toUpperCase()}_TO_EMAIL`);
  
  if (missing.length > 0) {
    return {
      valid: false,
      message: `Missing environment variables for ${projectId}: ${missing.join(', ')}`
    };
  }
  
  return {
    valid: true,
    config: project
  };
};

// Get project configuration
const getProjectConfig = (projectId) => {
  return validateProjectConfig(projectId);
};

module.exports = {
  projects,
  getProjectConfig,
  validateProjectConfig
};
