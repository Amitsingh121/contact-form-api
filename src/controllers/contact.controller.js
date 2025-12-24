const transporter = require('../config/email.config');

// Contact form submission handler
const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, description } = req.body;

    // Validation
    if (!name || !email || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, email aur description required hai'
      });
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: `Contact Form: ${subject || 'New Message'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${description}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Message send nahi hua, please try again'
    });
  }
};

module.exports = { submitContactForm };
