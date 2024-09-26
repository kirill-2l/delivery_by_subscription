import toast, { ToastOptions } from 'react-hot-toast';

export const getToastError = (error: string, options?: ToastOptions) =>
  toast.error(error, {
    icon: '❌',
    ...options,
  });
