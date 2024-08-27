import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from '@/shared/components/shared/modals/auth-modal/forms/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

interface RegisterFormProps {

};
export const RegisterForm = (props: RegisterFormProps) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      password: '',
      email: '',
      confirmPassword: '',
    },
  });
  return (
    <FormProvider {...form}>
      <div className="flex flex-col">
        <div className="font-semibold tracking-tight text-2xl">Register</div>
        <div className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </div>
      </div>
    </FormProvider>
  );
};
