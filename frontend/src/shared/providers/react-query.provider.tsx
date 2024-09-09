'use client';

import { ReactNode } from 'react';
import { getQueryClient } from '@/shared/services/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
