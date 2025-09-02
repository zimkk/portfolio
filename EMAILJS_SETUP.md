# EmailJS Setup Guide

This guide will help you set up EmailJS to handle contact form submissions on your portfolio website.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID** (it will look like `service_xxxxxxx`)

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Design your email template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Sender's message
4. Save the template and note down your **Template ID** (it will look like `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (it will look like `xxxxxxxxxxxxxxxxxxxx`)

## Step 5: Update Configuration

1. Open `src/config/emailjs.ts`
2. Replace the placeholder values with your actual credentials:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_xxxxxxx', // Your actual service ID
  TEMPLATE_ID: 'template_xxxxxxx', // Your actual template ID
  PUBLIC_KEY: 'xxxxxxxxxxxxxxxxxxxx', // Your actual public key
};
```

## Step 6: Test Your Setup

1. Start your development server: `npm run dev`
2. Go to your contact form
3. Fill out the form and submit
4. Check your email to see if the message was received

## Email Template Examples

### Option 1: HTML Template (Recommended)

Use the provided `email-template.html` file for a professional, branded email:

1. Copy the content from `email-template.html`
2. In your EmailJS dashboard, create a new template
3. Paste the HTML content into the template editor
4. Set the subject line to: "New Contact Form Submission from {{from_name}}"

### Option 2: Simple Text Template

For better email client compatibility, use the `email-template-text.txt` file:

1. Copy the content from `email-template-text.txt`
2. Create a new template in EmailJS
3. Paste the text content
4. Set the subject line to: "New Contact Form Submission from {{from_name}}"

### Template Variables Used:

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email address
- `{{message}}` - Sender's message
- `{{sent_date}}` - Date when message was sent (auto-filled by EmailJS)
- `{{sent_time}}` - Time when message was sent (auto-filled by EmailJS)

## Troubleshooting

- Make sure all your EmailJS credentials are correct
- Check the browser console for any error messages
- Verify that your email service is properly connected
- Ensure your template variables match the form field names

## Security Notes

- Never commit your EmailJS credentials to version control
- Consider using environment variables for production
- The public key is safe to use in client-side code
