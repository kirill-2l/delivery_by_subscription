'use client';

import { Button } from '@/shared/components/ui';
import { FormInput } from '@/shared/components/shared/form/form-input';
import { FormProvider, useForm } from 'react-hook-form';
import {
  formLoginSchema,
  TFormLoginValues,
} from '@/shared/components/shared/modals/auth-modal/forms/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onClose?: () => void;
}

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        ...data,
      });
      if (!res?.ok) {
        throw Error();
      }
      toast.success('Successfully logged in', {
        icon: '✅',
      });
    } catch (err) {
      console.error('Error [LOGIN]', err);
      toast.error('Unsuccessful logging in', {
        icon: '❌',
      });
    }

    onClose?.();
  };

  return (
    <FormProvider {...form}>
      <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          className='grid gap-2'
          label='Email'
          name='email'
          type='email'
        />
        <FormInput
          className='grid gap-2'
          name='password'
          type='password'
          label='Password'
          labelSlot={
            <Button
              variant={'link'}
              type={'button'}
              className='ml-auto inline-block text-sm underline'
            >
              Forgot your password?
            </Button>
          }
        />
        <Button type='submit' className='w-full'>
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
