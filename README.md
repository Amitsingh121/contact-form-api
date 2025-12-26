# Contact Form API

A simple Node.js API for handling contact form submissions via email using Nodemailer.

## Features

- REST API endpoint for contact form submissions
- Email notifications via Gmail
- Input validation
- CORS enabled for frontend integration

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
TO_EMAIL=recipient-email@gmail.com
```

3. Run the server:
```bash
npm start
# or for development
npm run dev
```

## API Endpoint

### POST /api/contact

Send a contact form submission.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Inquiry",
  "description": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```
