'use client';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { cn } from '@/utils/cn';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      side="bottom"
      className={cn(
        'z-50 origin-(--radix-popover-content-transform-origin)',
        'overflow-y-auto max-h-(--radix-popover-content-available-height)',
        'min-w-[240px] max-w-[98vw] rounded-xl border',
        'bg-fd-popover/70 backdrop-blur-[32px] p-2',
        'text-sm text-fd-popover-foreground',
        'shadow-[0_4px_16px_color-mix(in_oklch,var(--color-fd-foreground)_6%,transparent),0_8px_32px_color-mix(in_oklch,var(--color-fd-primary)_4%,transparent)]',
        'focus-visible:outline-none',
        'data-[state=closed]:animate-[ios26-popover-exit_150ms_cubic-bezier(0.22,1,0.36,1)]',
        'data-[state=open]:animate-[ios26-popover-enter_220ms_cubic-bezier(0.34,1.56,0.64,1)]',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverClose = PopoverPrimitive.PopoverClose;

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
