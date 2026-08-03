'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { EASE_PREMIUM } from '@/animations/variants';

/**
 * Tokenised so each line renders with real syntax colours instead of a flat
 * string. Kept as data rather than JSX so the reveal can stagger by line.
 */
type Token = { text: string; tone: 'kw' | 'fn' | 'str' | 'var' | 'punc' | 'comment' };

const CODE: Token[][] = [
  [
    { text: 'router', tone: 'var' },
    { text: '.', tone: 'punc' },
    { text: 'post', tone: 'fn' },
    { text: '(', tone: 'punc' },
    { text: "'/api/calls'", tone: 'str' },
    { text: ', ', tone: 'punc' },
    { text: 'auth', tone: 'fn' },
    { text: ', ', tone: 'punc' },
    { text: 'async', tone: 'kw' },
    { text: ' (req, res) => {', tone: 'punc' },
  ],
  [
    { text: '  const', tone: 'kw' },
    { text: ' { agentId, to } = ', tone: 'punc' },
    { text: 'validate', tone: 'fn' },
    { text: '(req.body);', tone: 'punc' },
  ],
  [{ text: '', tone: 'punc' }],
  [
    { text: '  const', tone: 'kw' },
    { text: ' call = ', tone: 'punc' },
    { text: 'await', tone: 'kw' },
    { text: ' db.calls.', tone: 'punc' },
    { text: 'create', tone: 'fn' },
    { text: '({', tone: 'punc' },
  ],
  [
    { text: '    status: ', tone: 'punc' },
    { text: "'queued'", tone: 'str' },
    { text: ', agentId, to,', tone: 'punc' },
  ],
  [{ text: '  });', tone: 'punc' }],
  [{ text: '', tone: 'punc' }],
  [
    { text: '  // webhook drives the state machine from here', tone: 'comment' },
  ],
  [
    { text: '  await', tone: 'kw' },
    { text: ' voice.', tone: 'punc' },
    { text: 'dial', tone: 'fn' },
    { text: '(call.id, to);', tone: 'punc' },
  ],
  [
    { text: '  return', tone: 'kw' },
    { text: ' res.', tone: 'punc' },
    { text: 'status', tone: 'fn' },
    { text: '(', tone: 'punc' },
    { text: '202', tone: 'str' },
    { text: ').', tone: 'punc' },
    { text: 'json', tone: 'fn' },
    { text: '({ id: call.id });', tone: 'punc' },
  ],
  [{ text: '});', tone: 'punc' }],
];

const TONE_CLASS: Record<Token['tone'], string> = {
  kw: 'text-[#C084FC]',
  fn: 'text-[#60A5FA]',
  str: 'text-[#22D3EE]',
  var: 'text-white',
  punc: 'text-slate-400',
  comment: 'text-slate-500 italic',
};

/**
 * Glass terminal that types itself in line by line.
 *
 * `aria-hidden` on the whole block: it is illustrative, and reading a code
 * sample aloud after the hero headline adds noise, not information.
 */
export function CodeWindow({ className }: { className?: string }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= CODE.length) return;
    const timer = setTimeout(() => setVisibleLines((n) => n + 1), 140);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 26, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 0.5 }}
      className={`glass-card overflow-hidden ${className ?? ''}`}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-hairline bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 font-mono text-[11px] text-muted">routes/calls.ts</span>
      </div>

      <pre className="overflow-x-auto p-4 font-mono text-[11.5px] leading-[1.75] sm:text-xs">
        <code>
          {CODE.slice(0, visibleLines).map((line, lineIndex) => (
            <motion.span
              key={lineIndex}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: EASE_PREMIUM }}
              className="flex"
            >
              <span className="mr-4 w-4 shrink-0 select-none text-right text-slate-600">
                {lineIndex + 1}
              </span>
              <span className="whitespace-pre">
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} className={TONE_CLASS[token.tone]}>
                    {token.text}
                  </span>
                ))}
                {lineIndex === visibleLines - 1 && visibleLines < CODE.length && (
                  <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent animate-blink" />
                )}
              </span>
            </motion.span>
          ))}
        </code>
      </pre>
    </motion.div>
  );
}
