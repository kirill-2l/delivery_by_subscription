import { cn } from '@/shared/utils/class-name';
import React, { PropsWithChildren } from 'react';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Container = ({ className, children }: Props) => {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 md:px-8', className)}>
      {children}
    </div>
  );
};
