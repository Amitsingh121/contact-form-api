const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contact.controller');

// Contact form endpoint
router.post('/contact', submitContactForm);

module.exports = router;
