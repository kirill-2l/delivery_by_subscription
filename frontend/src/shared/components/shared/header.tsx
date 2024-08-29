'use client';

import { cn } from '@/shared/lib/utils';
import React, { FC, useState } from 'react';
import { Container } from './container';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui';
import { AuthModal } from '@/shared/components/shared/modals';
import { useSession } from 'next-auth/react';
import { UserProfile } from '@/shared/components/shared';

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
    <header className={cn('border-b', className)}>
      <Container className='flex items-center justify-between py-8'>
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <div>
              <h1 className='text-2xl font-black uppercase'>Delivery</h1>
            </div>
          </div>
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
