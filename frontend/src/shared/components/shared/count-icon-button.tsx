import { Button } from '@/shared/components/ui';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { cn } from '@/shared/utils';

interface CountIconButtonProps {
  type: 'plus' | 'minus';
  onClick: () => void;
  size: 'sm' | 'lg';
  disabled?: boolean;
}

export const CountIconButton = (props: CountIconButtonProps) => {
  const { type, onClick, disabled, size } = props;
  return (
    <Button
      variant='outline'
      disabled={disabled}
      onClick={onClick}
      type='button'
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:border-gray-400 disabled:bg-white disabled:text-gray-400',
        size === 'sm'
          ? 'h-[30px] w-[30px] rounded-[10px]'
          : 'h-[38px] w-[38px] rounded-md'
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className={size === 'sm' ? 'h-4' : 'h-5'} />
      ) : (
        <MinusIcon className={size === 'sm' ? 'h-4' : 'h-5'} />
      )}
    </Button>
  );
};
