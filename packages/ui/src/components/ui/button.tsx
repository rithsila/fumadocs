import { cva, type VariantProps } from 'class-variance-authority';

const variants = {
  primary: 
    'bg-fd-primary text-fd-primary-foreground shadow-[0_2px_8px_color-mix(in_oklch,var(--color-fd-primary)_25%,transparent),0_4px_16px_color-mix(in_oklch,var(--color-fd-primary)_15%,transparent)] ' +
    'hover:shadow-[0_4px_12px_color-mix(in_oklch,var(--color-fd-primary)_30%,transparent),0_8px_24px_color-mix(in_oklch,var(--color-fd-primary)_20%,transparent)] ' +
    'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  outline: 
    'border border-fd-border bg-fd-background/50 backdrop-blur-sm ' +
    'hover:bg-fd-accent hover:text-fd-accent-foreground hover:border-fd-accent-foreground/20 ' +
    'hover:shadow-[0_2px_8px_color-mix(in_oklch,var(--color-fd-accent)_12%,transparent)] ' +
    'active:scale-[0.98]',
  ghost: 
    'hover:bg-fd-accent/80 hover:text-fd-accent-foreground ' +
    'hover:backdrop-blur-md hover:shadow-sm ' +
    'active:scale-[0.98]',
  secondary:
    'border bg-fd-secondary text-fd-secondary-foreground backdrop-blur-sm ' +
    'hover:bg-fd-accent hover:text-fd-accent-foreground ' +
    'hover:shadow-md active:scale-[0.98]',
} as const;

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md p-2 text-sm font-medium ' +
  'transition-all duration-[220ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring ' +
  'focus-visible:shadow-[0_0_0_4px_var(--color-fd-background),0_0_0_6px_var(--color-fd-ring),0_0_16px_color-mix(in_oklch,var(--color-fd-primary)_30%,transparent)]',
  {
    variants: {
      variant: variants,
      // fumadocs use `color` instead of `variant`
      color: variants,
      size: {
        sm: 'gap-1 px-2 py-1.5 text-xs min-h-[36px]',
        icon: 'p-1.5 [&_svg]:size-5 min-w-[44px] min-h-[44px]',
        'icon-sm': 'p-1.5 [&_svg]:size-4.5 min-w-[40px] min-h-[40px]',
        'icon-xs': 'p-1 [&_svg]:size-4 min-w-[36px] min-h-[36px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export type ButtonProps = VariantProps<typeof buttonVariants>;
