import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-pill text-sm font-medium transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary CTA — gradient fill with a lift on hover.
        primary:
          'bg-gradient-brand bg-[length:200%_200%] text-[#040914] shadow-glow hover:bg-[position:100%_50%] hover:shadow-card-hover',
        // Secondary — glass surface, hairline border brightens on hover.
        secondary:
          'glass text-white hover:border-primary/50 hover:bg-white/[0.08] hover:shadow-glow',
        outline:
          'border border-hairline bg-transparent text-white hover:border-primary/60 hover:text-primary-soft',
        ghost: 'text-muted hover:bg-white/5 hover:text-white',
        link: 'text-primary-soft underline-offset-4 hover:text-accent hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-[13px]',
        md: 'h-11 px-6',
        lg: 'h-13 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
