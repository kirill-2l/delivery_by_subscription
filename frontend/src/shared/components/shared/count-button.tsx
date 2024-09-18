import { cn } from '@/shared/utils';
import { CountIconButton } from '@/shared/components/shared';

interface CountButtonProps {
  className?: string;
  onClick: (type: 'plus' | 'minus') => void;
  size?: 'sm' | 'lg';
  value?: number;
}

export const CountButton = (props: CountButtonProps) => {
  const { className, onClick, size = 'sm', value } = props;
  return (
    <div
      className={cn(
        'inline-flex items-center justify-between gap-3',
        className
      )}
    >
      <CountIconButton
        onClick={() => onClick?.('minus')}
        disabled={value === 1}
        size={size}
        type='minus'
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton
        onClick={() => onClick?.('plus')}
        size={size}
        type='plus'
      />
    </div>
  );
};
