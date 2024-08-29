import { cn } from '@/shared/lib/utils';

interface Props {
  text: String,
  className?: string
};

export const ErrorText = (props: Props) => {
  const { className, text } = props;
  return <p className={cn('text-red-500 text-sm', className)}>{text}</p>;
};
