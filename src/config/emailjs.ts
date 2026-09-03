// EmailJS Configuration
// Loaded securely from environment variables (.env)
// Never hardcode personal credentials in public source files.
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

// Template variables sent to EmailJS
export const EMAILJS_TEMPLATE_PARAMS = {
  from_name: '',
  from_email: '',
  message: '',
};
