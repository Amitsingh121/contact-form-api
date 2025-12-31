const templates = {
  // Default template
  default: {
    primaryColor: '#3498db',
    secondaryColor: '#2c3e50',
    logoUrl: null,
    companyName: 'Contact Form',
    footerText: 'This email was sent from your website contact form.'
  },
  
  // Website 1 template
  website1: {
    primaryColor: '#e74c3c',
    secondaryColor: '#c0392b',
    logoUrl: 'https://i.ibb.co/PG7FCDXJ/Screenshot-2026-01-01-012344.png',
    companyName: 'SSHSOFTTECH',
    footerText: 'This email was sent from sshsofttech contact form.'
  },
  
  // Website 2 template
  website2: {
    primaryColor: '#27ae60',
    secondaryColor: '#1e8449',
    logoUrl: 'https://yourwebsite2.com/logo.png',
    companyName: 'Website 2',
    footerText: 'This email was sent from Website 2 contact form.'
  }
};

const getEmailTemplate = (projectId, data) => {
  const template = templates[projectId] || templates.default;
  const { name, email, phone, subject, description } = data;
  
  const emailSubject = `${template.companyName} - Contact: ${subject || 'New Message'}`;
  
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${emailSubject}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background-color: ${template.primaryColor}; padding: 30px; text-align: center;">
          ${template.logoUrl ? `<img src="${template.logoUrl}" alt="${template.companyName}" style="max-height: 50px; margin-bottom: 10px;">` : ''}
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${template.companyName}</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">New Contact Form Submission</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; font-weight: bold; width: 30%; border-bottom: 1px solid #eee; color: ${template.secondaryColor};">Name:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee; color: ${template.secondaryColor};">Email:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: ${template.primaryColor};">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee; color: ${template.secondaryColor};">Phone:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee; color: ${template.secondaryColor};">Subject:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${subject || 'N/A'}</td>
            </tr>
          </table>
          
          <!-- Message Box -->
          <div style="margin-top: 25px; padding: 20px; background-color: #f8f9fa; border-left: 4px solid ${template.primaryColor}; border-radius: 0 5px 5px 0;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: ${template.secondaryColor};">Message:</p>
            <p style="margin: 0; white-space: pre-wrap; color: #555;">${description}</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="margin: 0; font-size: 12px; color: #888;">${template.footerText}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const emailText = `
${template.companyName} - New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject || 'N/A'}

Message:
${description}

---
${template.footerText}
  `;
  
  return {
    subject: emailSubject,
    html: emailHtml,
    text: emailText
  };
};

module.exports = { templates, getEmailTemplate };
