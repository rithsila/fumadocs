'use client';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { forwardRef, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ children, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      {...props}
      className={cn(
        'overflow-hidden',
        mounted &&
          'data-[state=closed]:animate-[ios26-accordion-collapse_220ms_cubic-bezier(0.22,1,0.36,1)] ' +
          'data-[state=open]:animate-[ios26-accordion-expand_320ms_cubic-bezier(0.34,1.56,0.64,1)]',
        props.className,
      )}
    >
      {children}
    </CollapsiblePrimitive.CollapsibleContent>
  );
});

CollapsibleContent.displayName =
  CollapsiblePrimitive.CollapsibleContent.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
