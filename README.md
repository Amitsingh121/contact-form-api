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

2. Create a `.env` file by copying `.env.example`:
```bash
cp .env.example .env
```

Then edit `.env` with your actual credentials:
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

## Deployment on Render

### Step 1: Push your code to GitHub
Make sure your `.env` file is in `.gitignore` (it already is).

```bash
git add .
git commit -m "Ready for deployment"
git push
```

### Step 2: Get SendGrid API Key (FREE - Recommended for Render)

SendGrid is required because Render blocks Gmail SMTP ports.

1. Go to https://signup.sendgrid.com/ and create a free account
2. Verify your email address
3. Go to Settings → API Keys → Create API Key
4. Name it "Render Contact Form" and select "Full Access"
5. **Copy the API key** (you won't see it again!)

### Step 3: Verify Sender Email in SendGrid

1. Go to Settings → Sender Authentication
2. Click "Verify a Single Sender"
3. Add your email: `amitksingh044@gmail.com`
4. Check your email and verify it

### Step 4: Create a Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: contact-form-api (or any name)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 5: Set Environment Variables

**IMPORTANT:** In Render dashboard, go to "Environment" tab and add these variables:

```
SENDGRID_API_KEY=your_sendgrid_api_key_here
EMAIL_USER=amitksingh044@gmail.com
TO_EMAIL=amitksingh7779@gmail.com
```

**Note:** `EMAIL_PASS` is not needed when using SendGrid.

### Step 6: Deploy

Click "Create Web Service" and wait for deployment to complete.

## Gmail App Password Setup

If you haven't already:

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to Security → 2-Step Verification → App passwords
4. Generate a new app password for "Mail"
5. Use this 16-character password in `EMAIL_PASS`

## Testing

Once deployed, test your API:

```bash
curl -X POST https://your-app.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "description": "This is a test message"
  }'
```

## Common Issues

### "getaddrinfo ENOTFOUND" error
- Check that environment variables are set correctly in Render
- Verify Gmail app password is correct

### Connection timeout
- Make sure your service is not in sleep mode (free tier sleeps after 15 mins of inactivity)
- Check Render logs for errors

### Email not sending
- Verify Gmail allows less secure app access or use app password
- Check spam folder
- Review Render logs for nodemailer errors

## File Structure

```
contact-form-api/
├── node_modules/
├── .env                 # Local environment variables (not in Git)
├── .gitignore          # Ignore node_modules and .env
├── package.json        # Dependencies and scripts
├── server.js           # Main server file
└── README.md           # This file
```

## License

ISC
