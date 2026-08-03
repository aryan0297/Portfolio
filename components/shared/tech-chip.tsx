import { cn } from '@/lib/utils';

interface TechChipProps {
  label: string;
  className?: string;
}

/** Small monospace pill used for tech stacks across cards and modals. */
export function TechChip({ label, className }: TechChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill border border-hairline bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted transition-colors duration-300 hover:border-primary/40 hover:text-primary-soft',
        className,
      )}
    >
      {label}
    </span>
  );
}
