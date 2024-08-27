import { z } from 'zod';

export const passwordSchema = z.string().min(4, { message: 'Password must be at least 4 characters long.' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema.merge(
  z.object({
    confirmPassword: passwordSchema,
  }),
)
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
