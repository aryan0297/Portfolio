import type { ContactFormErrors, ContactFormValues } from '@/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Synchronous contact-form validation. Kept framework-free so it can run on the
 * client for instant feedback and be reused by a server action later.
 */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name (2+ characters).';
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.subject.trim().length < 3) {
    errors.subject = 'Add a short subject (3+ characters).';
  }
  if (values.message.trim().length < 20) {
    errors.message = 'Tell me a bit more — at least 20 characters.';
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
