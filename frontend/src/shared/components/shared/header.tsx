'use client';

import { cn } from '@/shared/utils/class-name';
import React, { FC, useState } from 'react';
import { Container } from './container';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui';
import { AuthModal } from '@/shared/components/shared/modals';
import { useSession } from 'next-auth/react';
import { UserProfile } from '@/shared/components/shared';
import { Logo } from '@/shared/components/shared/logo';
import { AppRoutes } from '@/shared/constants';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <header className={cn('z-20 border-b bg-white', className)}>
      <Container className='flex items-center justify-between py-4'>
        <Link href={AppRoutes.home}>
          <Logo />
        </Link>

        <AuthModal
          open={openAuthModal}
          onClose={() => setOpenAuthModal(false)}
        />
        {session ? (
          <UserProfile user={session.user} />
        ) : (
          <Button onClick={() => setOpenAuthModal(true)}>Sign in</Button>
        )}
      </Container>
    </header>
  );
};
