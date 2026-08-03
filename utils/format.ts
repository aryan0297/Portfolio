/** Human-readable "time since" for GitHub activity timestamps. */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '—';

  const seconds = Math.floor((Date.now() - then) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31_536_000],
    ['month', 2_592_000],
    ['week', 604_800],
    ['day', 86_400],
    ['hour', 3_600],
    ['minute', 60],
  ];

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  for (const [unit, secondsInUnit] of units) {
    const value = Math.floor(seconds / secondsInUnit);
    if (value >= 1) return formatter.format(-value, unit);
  }
  return 'just now';
}

/** Compact number display, e.g. 1400 -> "1.4k". */
export function compactNumber(value: number): string {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

/** Deterministic brand colour per language so repo chips stay stable across renders. */
export function languageColor(language: string | null): string {
  const map: Record<string, string> = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Python: '#3776AB',
    HTML: '#E34F26',
    CSS: '#1572B6',
    Shell: '#89E051',
    SQL: '#E38C00',
    Dockerfile: '#2496ED',
  };
  return map[language ?? ''] ?? '#60A5FA';
}
