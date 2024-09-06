'use client';

import { useFormContext } from 'react-hook-form';
import { Input, Label } from '@/shared/components/ui';
import { ErrorText } from '@/shared/components/shared/error-text';
import { ReactNode } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  labelSlot?: ReactNode;
}

export const FormInput = (props: Props) => {
  const { className, name, label, required, labelSlot, ...rest } = props;
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);

  const errorsText = errors[name]?.message?.toString();

  return (
    <div className={className}>
      {label && (
        <div className='flex items-center'>
          <Label htmlFor={name}>{label}</Label>
          {labelSlot && labelSlot}
        </div>
      )}

      <Input id={name} {...register(name)} {...rest} />
      {errorsText && <ErrorText text={errorsText} />}
    </div>
  );
};
