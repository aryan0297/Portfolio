import emailjs from '@emailjs/browser';

import type { ContactFormValues } from '@/types';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/**
 * EmailJS keys are public by design — the service is browser-side and rate
 * limits per key. Nothing secret ships here.
 */
export const isEmailJsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/**
 * Sends the contact form.
 *
 * Template variables expected by the EmailJS template:
 *   {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 */
export async function sendContactEmail(values: ContactFormValues): Promise<void> {
  if (!isEmailJsConfigured) {
    throw new Error('EmailJS is not configured.');
  }

  await emailjs.send(
    SERVICE_ID as string,
    TEMPLATE_ID as string,
    {
      from_name: values.name,
      from_email: values.email,
      subject: values.subject,
      message: values.message,
    },
    { publicKey: PUBLIC_KEY as string },
  );
}
