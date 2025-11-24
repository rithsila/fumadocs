import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type CalloutType = 'info' | 'warn' | 'error' | 'success' | 'warning';

const iconClass = 'size-5 -me-0.5';

export function Callout({
  children,
  title,
  ...props
}: { title?: ReactNode } & Omit<CalloutContainerProps, 'title'>) {
  return (
    <CalloutContainer {...props}>
      {title && <CalloutTitle>{title}</CalloutTitle>}
      <CalloutDescription>{children}</CalloutDescription>
    </CalloutContainer>
  );
}

export interface CalloutContainerProps extends ComponentProps<'div'> {
  /**
   * @defaultValue info
   */
  type?: CalloutType;

  /**
   * Force an icon
   */
  icon?: ReactNode;
}

function resolveAlias(type: CalloutType) {
  if (type === 'warn') return 'warning';
  if ((type as unknown) === 'tip') return 'info';
  return type;
}

export function CalloutContainer({
  type: inputType = 'info',
  icon,
  children,
  className,
  style,
  ...props
}: CalloutContainerProps) {
  const type = resolveAlias(inputType);

  return (
    <div
      className={cn(
        'flex gap-2 my-4 rounded-xl border p-3 ps-1 text-sm',
        'bg-fd-card/80 text-fd-card-foreground backdrop-blur-md',
        'shadow-[0_2px_8px_color-mix(in_oklch,var(--callout-color)_12%,transparent),0_4px_16px_color-mix(in_oklch,var(--callout-color)_8%,transparent)]',
        'transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        className,
      )}
      style={
        {
          '--callout-color': `var(--color-fd-${type}, var(--color-fd-muted))`,
          ...style,
        } as object
      }
      {...props}
    >
      <div 
        role="none" 
        className="w-1 bg-gradient-to-b from-(--callout-color) to-(--callout-color)/50 rounded-sm shadow-[0_0_8px_var(--callout-color)]" 
      />
      <div className={cn(
        'flex-shrink-0 rounded-lg p-1.5',
        'bg-gradient-to-br shadow-sm',
        type === 'info' && 'from-blue-500/15 to-blue-600/10 text-blue-600 dark:from-blue-400/20 dark:to-blue-500/15 dark:text-blue-400',
        type === 'warning' && 'from-amber-500/15 to-amber-600/10 text-amber-600 dark:from-amber-400/20 dark:to-amber-500/15 dark:text-amber-400',
        type === 'error' && 'from-red-500/15 to-red-600/10 text-red-600 dark:from-red-400/20 dark:to-red-500/15 dark:text-red-400',
        type === 'success' && 'from-green-500/15 to-green-600/10 text-green-600 dark:from-green-400/20 dark:to-green-500/15 dark:text-green-400',
      )}>
        {icon ??
          {
            info: <Info className={iconClass} />,
            warning: <TriangleAlert className={iconClass} />,
            error: <CircleX className={iconClass} />,
            success: <CircleCheck className={iconClass} />,
          }[type]}
      </div>
      <div className="flex flex-col gap-2 min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function CalloutTitle({
  children,
  className,
  ...props
}: ComponentProps<'p'>) {
  return (
    <p className={cn('font-medium my-0!', className)} {...props}>
      {children}
    </p>
  );
}

export function CalloutDescription({
  children,
  className,
  ...props
}: ComponentProps<'p'>) {
  return (
    <div
      className={cn(
        'text-fd-muted-foreground prose-no-margin empty:hidden',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
