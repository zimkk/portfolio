// EmailJS Configuration
// Replace these values with your actual EmailJS credentials
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID', // Your EmailJS service ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Your EmailJS template ID
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Your EmailJS public key
};

// Template variables that will be sent to EmailJS
export const EMAILJS_TEMPLATE_PARAMS = {
  from_name: '', // Will be filled by form
  from_email: '', // Will be filled by form
  message: '', // Will be filled by form
};
