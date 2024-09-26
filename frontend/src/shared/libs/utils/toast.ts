import toast, { ToastOptions } from 'react-hot-toast';

export const getToastError = (message: string, options?: ToastOptions) =>
  toast.error(message, {
    icon: '❌',
    position: 'bottom-right',
    ...options,
  });

export const getToastSuccess = (message: string, options?: ToastOptions) =>
  toast.success(message, {
    icon: '✅',
    position: 'bottom-right',
    ...options,
  });
