import { cn } from '@/shared/utils/class-name';
import React, { PropsWithChildren } from 'react';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Container = ({ className, children }: Props) => {
  return (
    <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>
  );
};
