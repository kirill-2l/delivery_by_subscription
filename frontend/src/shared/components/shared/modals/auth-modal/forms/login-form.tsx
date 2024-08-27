'use client';

import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { FormInput } from '@/shared/components/shared/form/form-input';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from '@/shared/components/shared/modals/auth-modal/forms/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

interface LoginFormProps {
  onSubmit: () => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signIn = () => {

  };

  return (
    <FormProvider {...form}>

      <form className="grid gap-4" onSubmit={signIn}>
        <FormInput
          className="grid gap-2"
          label="Email"
          name="email"
          type="email" />
        <FormInput
          className="grid gap-2"
          name="password"
          type="password"
          label="Password"
          labelSlot={
            <Button variant={'link'} type={'button'} className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Button>
          } />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
