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

    // Email options with improved deliverability
    const emailSubject = `Contact Form: ${subject || 'New Message'}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${emailSubject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 10px; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 10px; font-weight: bold;">Phone:</td>
              <td style="padding: 10px;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Subject:</td>
              <td style="padding: 10px;">${subject || 'N/A'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #3498db;">
            <p style="margin: 0; font-weight: bold;">Message:</p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${description}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This email was sent from your website contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject || 'N/A'}

Message:
${description}

---
This email was sent from your website contact form.
    `;
    
    const mailOptions = {
      from: {
        email: process.env.EMAIL_USER,
        name: 'Contact Form'
      },
      to: process.env.TO_EMAIL,
      replyTo: email, // Allow direct reply to the submitter
      subject: emailSubject,
      text: emailText, // Plain text version improves deliverability
      html: emailHtml
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response?.body || 'No response body'
    });
    
    // Better error message for SendGrid 403
    let userMessage = 'Message send nahi hua, please try again';
    if (error.code === 403) {
      userMessage = 'Email sending failed. Please verify your sender email in SendGrid.';
      console.error('⚠️  SendGrid 403: Sender email not verified in SendGrid dashboard');
    }
    
    res.status(500).json({
      success: false,
      message: userMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { submitContactForm };
