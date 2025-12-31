const { createTransporter } = require('../config/email.config');
const { getProjectConfig } = require('../config/projects.config');
const { getEmailTemplate } = require('../config/templates.config');

// Contact form submission handler
const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, description } = req.body;
    const { projectId } = req.params;

    // Get project configuration (dynamic based on URL)
    let emailUser, emailPass, toEmail, projectName;
    
    if (projectId) {
      // Use project-specific configuration
      const projectValidation = getProjectConfig(projectId);
      
      if (!projectValidation.valid) {
        return res.status(404).json({
          success: false,
          message: projectValidation.message
        });
      }
      
      const config = projectValidation.config;
      emailUser = config.emailUser;
      emailPass = config.emailPass;
      toEmail = config.toEmail;
      projectName = config.name;
      
      console.log(`📧 Processing contact form for project: ${projectName} (${projectId})`);
    } else {
      // Fallback to default environment variables for legacy /contact endpoint
      emailUser = process.env.EMAIL_USER;
      emailPass = process.env.EMAIL_PASS;
      toEmail = process.env.TO_EMAIL;
      projectName = 'Default';
      
      // console.log('📧 Processing contact form for default project');
    }

    // Validation
    if (!name || !email || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, email aur description required hai'
      });
    }

    // Create dynamic transporter for this project
    const transporter = createTransporter(emailUser, emailPass);

    // Get template based on projectId
    const emailContent = getEmailTemplate(projectId || 'default', {
      name,
      email,
      phone,
      subject,
      description
    });

    const mailOptions = {
      from: {
        email: emailUser,
        name: emailContent.subject.split(' - ')[0] // Use company name from template
      },
      to: toEmail,
      replyTo: email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // console.log(`✅ Email sent successfully from ${emailUser} to ${toEmail}`);

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
