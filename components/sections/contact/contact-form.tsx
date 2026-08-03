'use client';

import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { profile } from '@/constants/profile';
import { isEmailJsConfigured, sendContactEmail } from '@/lib/emailjs';
import { cn } from '@/lib/utils';
import type { ContactFormErrors, ContactFormValues } from '@/types';
import { hasErrors, validateContactForm } from '@/utils/validation';

const EMPTY: ContactFormValues = { name: '', email: '', subject: '', message: '' };

/** Plain-text rendering of the form, used by both the mailto: body and the clipboard fallback. */
function composeMessage(values: ContactFormValues): string {
  return `${values.message}\n\n— ${values.name} (${values.email})`;
}

/**
 * Opens the user's mail client with the message prefilled.
 *
 * `window.location.href = 'mailto:…'` silently no-ops on machines with no
 * registered mail handler — which is exactly what a dead Send button looks
 * like. A synthesised anchor click is handled far more consistently, and the
 * caller pairs this with a clipboard copy so the text is never lost either way.
 */
function openMailClient(values: ContactFormValues, to: string): void {
  const url = `mailto:${to}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(
    composeMessage(values),
  )}`;

  const link = document.createElement('a');
  link.href = url;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

interface FieldProps {
  id: keyof ContactFormValues;
  label: string;
  placeholder: string;
  type?: 'text' | 'email';
  multiline?: boolean;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

/** One field renderer for both inputs and the textarea — no duplicated markup. */
function Field({
  id,
  label,
  placeholder,
  type = 'text',
  multiline = false,
  value,
  error,
  onChange,
}: FieldProps) {
  const shared = cn(
    'w-full rounded-2xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-muted/60',
    'transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50',
    error ? 'border-red-400/60' : 'border-hairline focus:border-primary/50',
  );

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium text-white">
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(shared, 'resize-y')}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={shared}
        />
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Contact form.
 *
 * Validation runs on submit and then live per field once a field has already
 * errored — validating on every keystroke from the start shouts at people while
 * they are still typing their email address.
 *
 * When EmailJS is not configured the form degrades to a prefilled `mailto:`
 * rather than silently failing, so the site is useful before any keys exist.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: keyof ContactFormValues) => (value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);

    // Only re-validate fields the user has already been told about. This runs
    // outside the state updater on purpose — an updater must stay pure, and
    // under StrictMode a nested setState there fires twice.
    if (!errors[field]) return;

    const fieldError = validateContactForm(next)[field];
    setErrors((prev) => {
      if (fieldError) return { ...prev, [field]: fieldError };
      const { [field]: _cleared, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      toast.error('Please fix the highlighted fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEmailJsConfigured) {
        await sendContactEmail(values);
        setValues(EMPTY);
        setErrors({});
        toast.success('Message sent', {
          description: "Thanks for reaching out — I'll get back to you shortly.",
        });
        return;
      }

      await fallbackToMailClient('Direct sending is not configured yet.');
    } catch (error) {
      // Sending failed for real — never leave the user with a dead button and a
      // lost message. Hand them the mail client plus a copy of the text.
      const detail = error instanceof Error ? error.message : 'Unknown error.';
      if (process.env.NODE_ENV !== 'production') console.error('[contact] send failed:', error);
      await fallbackToMailClient(detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Shared escape hatch for both "not configured" and "send failed". */
  const fallbackToMailClient = async (reason: string) => {
    openMailClient(values, profile.email);
    const copied = await copyToClipboard(composeMessage(values));

    toast.info('Opening your email client', {
      description: `${reason} Your message has been prefilled${
        copied ? ' and copied to your clipboard' : ''
      } — send it to ${profile.email}.`,
      duration: 10_000,
      action: {
        label: 'Copy address',
        onClick: () => {
          void copyToClipboard(profile.email);
        },
      },
    });
  };

  return (
    <GlassCard spotlight={false} className="p-6 md:p-8">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="name"
            label="Name"
            placeholder="Jane Doe"
            value={values.name}
            error={errors.name}
            onChange={update('name')}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            placeholder="jane@company.com"
            value={values.email}
            error={errors.email}
            onChange={update('email')}
          />
        </div>

        <Field
          id="subject"
          label="Subject"
          placeholder="Backend role / project enquiry"
          value={values.subject}
          error={errors.subject}
          onChange={update('subject')}
        />

        <Field
          id="message"
          label="Message"
          multiline
          placeholder="Tell me what you're building and where you need backend or AI automation help."
          value={values.message}
          error={errors.message}
          onChange={update('message')}
        />

        <Button type="submit" disabled={isSubmitting} className="mt-1 w-full sm:w-auto sm:self-start">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Send message
            </>
          )}
        </Button>

        {!isEmailJsConfigured && (
          // Set NEXT_PUBLIC_EMAILJS_* in .env.local (and in the host's env vars)
          // to enable direct sending; this notice disappears once they are set.
          <p className="text-[11px] text-muted">
            Direct sending is not configured — submitting opens your email client with the
            message prefilled instead.
          </p>
        )}
      </form>
    </GlassCard>
  );
}
