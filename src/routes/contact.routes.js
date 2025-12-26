const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contact.controller');

// Project-specific contact form endpoints
// Example: /api/contact/website1 or /api/contact/website2
router.post('/contact/:projectId', submitContactForm);

// Legacy endpoint for backward compatibility (uses default env vars)
router.post('/contact', submitContactForm);

module.exports = router;
