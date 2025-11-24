import Link from 'fumadocs-core/link';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function Cards(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('grid grid-cols-2 gap-3 @container', props.className)}
    >
      {props.children}
    </div>
  );
}

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;

  href?: string;
  external?: boolean;
};

export function Card({ icon, title, description, ...props }: CardProps) {
  const E = props.href ? Link : 'div';

  return (
    <E
      {...props}
      data-card
      className={cn(
        'block rounded-xl border bg-fd-card p-4 text-fd-card-foreground',
        'transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        '@max-lg:col-span-full',
        props.href && 
          'hover:bg-fd-accent/80 hover:-translate-y-0.5 ' +
          'hover:shadow-[0_4px_16px_color-mix(in_oklch,var(--color-fd-foreground)_4%,transparent),0_8px_32px_color-mix(in_oklch,var(--color-fd-primary)_4%,transparent)] ' +
          'active:translate-y-0 active:scale-[0.99]',
        props.className,
      )}
    >
      {icon ? (
        <div className={cn(
          'not-prose mb-2 w-fit rounded-lg border p-1.5',
          'bg-fd-muted/80 text-fd-muted-foreground [&_svg]:size-4',
          'shadow-md backdrop-blur-sm',
          'transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          props.href && 'group-hover:shadow-lg group-hover:scale-105'
        )}>
          {icon}
        </div>
      ) : null}
      <h3 className="not-prose mb-1 text-sm font-medium">{title}</h3>
      {description ? (
        <p className="my-0! text-sm text-fd-muted-foreground">{description}</p>
      ) : null}
      <div className="text-sm text-fd-muted-foreground prose-no-margin empty:hidden">
        {props.children}
      </div>
    </E>
  );
}
