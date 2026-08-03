import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300',
  {
    variants: {
      variant: {
        default: 'border-hairline bg-white/[0.04] text-muted hover:border-primary/40 hover:text-white',
        primary: 'border-primary/30 bg-primary/10 text-primary-soft',
        accent: 'border-accent/30 bg-accent/10 text-accent',
        success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
