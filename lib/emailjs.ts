import emailjs from '@emailjs/browser';

import type { ContactFormValues } from '@/types';

/**
 * `.env` values routinely arrive with stray quotes or trailing whitespace after
 * a copy/paste from the EmailJS dashboard, which produces a 400 that looks like
 * a template problem. Normalise once, here.
 */
function readKey(value: string | undefined): string {
  return (value ?? '').trim().replace(/^['"]|['"]$/g, '');
}

const SERVICE_ID = readKey(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
const TEMPLATE_ID = readKey(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
const PUBLIC_KEY = readKey(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

/**
 * EmailJS keys are public by design — the service is browser-side and rate
 * limits per key. Nothing secret ships here.
 *
 * NOTE: `NEXT_PUBLIC_*` is inlined at build time, so changing these values
 * requires a rebuild/redeploy, not just a restart of the hosting process.
 */
export const isEmailJsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/**
 * Sends the contact form.
 *
 * Template variables expected by the EmailJS template:
 *   {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 *
 * `reply_to` and `to_name` are sent as well — the default EmailJS template uses
 * `{{reply_to}}` for the Reply-To header, and without it replies go nowhere.
 *
 * Rejects with a human-readable message; EmailJS errors are `{status, text}`
 * objects rather than `Error` instances, so they need unwrapping to be useful.
 */
export async function sendContactEmail(values: ContactFormValues): Promise<void> {
  if (!isEmailJsConfigured) {
    throw new Error('EmailJS is not configured.');
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: values.name.trim(),
        from_email: values.email.trim(),
        reply_to: values.email.trim(),
        to_name: 'Aryan',
        subject: values.subject.trim(),
        message: values.message.trim(),
      },
      { publicKey: PUBLIC_KEY },
    );
  } catch (error) {
    throw new Error(describeEmailJsError(error));
  }
}

/** Turns an EmailJS rejection into something worth putting in front of a user. */
function describeEmailJsError(error: unknown): string {
  if (error && typeof error === 'object' && 'text' in error) {
    const { status, text } = error as { status?: number; text?: string };
    if (status === 400) {
      return `EmailJS rejected the request (400): ${text}. Check the service/template IDs and that the template defines from_name, from_email, subject and message.`;
    }
    if (status === 401 || status === 403) {
      return `EmailJS refused the request (${status}): ${text}. Check the public key and that the domain is allowed in the EmailJS dashboard.`;
    }
    if (status === 412) {
      return `EmailJS could not reach the mail provider (412): ${text}. Reconnect the service in the EmailJS dashboard.`;
    }
    if (status === 429) {
      return 'EmailJS rate limit reached. Please try again in a moment.';
    }
    return `EmailJS error${status ? ` (${status})` : ''}: ${text ?? 'unknown'}`;
  }

  if (error instanceof Error) return error.message;
  return 'Unknown error while sending.';
}
