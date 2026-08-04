import type { ContactFormErrors, ContactFormValues } from '@/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Field length ceilings. Applied both here and as `maxLength` on the inputs
 * themselves, so oversized payloads are rejected at the source rather than
 * forwarded to the EmailJS API (which has its own stricter limits).
 */
export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

/**
 * Synchronous contact-form validation. Kept framework-free so it can run on the
 * client for instant feedback and be reused by a server action later.
 */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = 'Please enter your name (2+ characters).';
  } else if (name.length > CONTACT_LIMITS.name) {
    errors.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`;
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (email.length > CONTACT_LIMITS.email) {
    errors.email = `Please keep your email under ${CONTACT_LIMITS.email} characters.`;
  }

  if (subject.length < 3) {
    errors.subject = 'Add a short subject (3+ characters).';
  } else if (subject.length > CONTACT_LIMITS.subject) {
    errors.subject = `Please keep the subject under ${CONTACT_LIMITS.subject} characters.`;
  }

  if (message.length < 20) {
    errors.message = 'Tell me a bit more — at least 20 characters.';
  } else if (message.length > CONTACT_LIMITS.message) {
    errors.message = `Please keep the message under ${CONTACT_LIMITS.message} characters.`;
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
