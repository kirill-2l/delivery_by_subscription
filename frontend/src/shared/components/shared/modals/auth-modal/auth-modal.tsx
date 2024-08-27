import { Dialog, DialogContent } from '@/shared/components/ui';
import { useState } from 'react';
import { LoginForm } from '@/shared/components/shared/modals/auth-modal/forms/login-form';
import Link from 'next/link';
import { AuthModalLoginHeader } from '@/shared/components/shared/modals/auth-modal/auth-modal-login-header';

interface Props {
  open: boolean,
  onClose: () => void,
};

export const AuthModal = (props: Props) => {
  const { open, onClose } = props;
  const [type, setType] = useState<'login' | 'register'>('login');
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent className="w-[450px]">
        {
          type === 'login' ?
            <>
              <AuthModalLoginHeader />
              <LoginForm onSubmit={handleClose} />
            </>
            : <LoginForm onSubmit={handleClose} />
        }

        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>

        {/*<Button variant="outline" className="w-full">*/}
        {/*  Login with Google*/}
        {/*</Button>*/}
      </DialogContent>


    </Dialog>
  );
};
