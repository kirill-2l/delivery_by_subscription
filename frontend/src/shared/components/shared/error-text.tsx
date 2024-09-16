import { cn } from '@/shared/utils/class-name';

interface Props {
  text: String;
  className?: string;
}

export const ErrorText = (props: Props) => {
  const { className, text } = props;
  return <p className={cn('text-sm text-red-500', className)}>{text}</p>;
};
