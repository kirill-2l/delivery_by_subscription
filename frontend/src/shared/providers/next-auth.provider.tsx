'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export const NextAuthProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session?: any;
}) => {
  console.log('session', session);
  return <SessionProvider>{children}</SessionProvider>;
};
