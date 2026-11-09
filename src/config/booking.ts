// Calendly booking link used by every "Book a call" button.
// A public link, so it can live in source; VITE_CALENDLY_URL overrides it without a code change.
export const CALENDLY_URL: string = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/hassannazir955/30min';

export const CALENDLY_WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js';
