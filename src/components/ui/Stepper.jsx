import * as React from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { User } from 'lucide-react';

const Stepper = React.forwardRef(
  ({ className, label, onChange, value, disabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          `${disabled && 'pointer-events-none opacity-50'} flex h-10 items-center justify-between gap-2 rounded-md border border-input bg-background py-2 text-sm`,
          className,
        )}
      >
        <Button
          disabled={value === 0}
          variant='link'
          onClick={() => onChange(value - 1)}
        >
          -
        </Button>
        <span
          className={cn(
            'text-muted-foregroun relative flex w-10 items-center justify-center truncate whitespace-nowrap',
            { 'opacity-50': value === 0 },
          )}
          ref={ref}
          {...props}
        >
          {value} <User className='ml-1 h-4 w-4' />
        </span>
        <Button
          disabled={value === 100}
          variant='link'
          onClick={() => onChange(value + 1)}
        >
          +
        </Button>
      </div>
    );
  },
);
Stepper.displayName = 'Stepper';

export { Stepper };
